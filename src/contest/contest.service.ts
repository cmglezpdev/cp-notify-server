import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron } from '@nestjs/schedule';
import { Repository } from 'typeorm';

import { IPlatform } from './interfaces';
import { Platform } from 'src/platform/entities/platform.entity';
import { Contest } from './entities/contest.entity';
import { AtCoderService } from '../judges/atcoder.service';
import { CodeforcesService } from '../judges/codeforces.service';

@Injectable()
export class ContestService {

  constructor(
    private readonly atCoderService: AtCoderService,
    private readonly codeforcesService: CodeforcesService,

    @InjectRepository(Contest)
    private readonly contestRepository: Repository<Contest>,
    @InjectRepository(Platform)
    private readonly platformRepository: Repository<Platform>
  ){}

  @Cron('0 0 0 * * *')
  async insertContestsInDB() {
    const platforms: Platform[] = await this.platformRepository.find();
    const contests: Contest[] = [];
    
    const promisesContests = platforms.map((plt) => this.findAll(plt.name.toUpperCase() as IPlatform));
    const resultPromises = await Promise.all(promisesContests);

    platforms.forEach(async (plt, i) => {
      resultPromises[i].forEach(contest => {
        const cs: Contest = new Contest();
        cs.id = `${contest.id}`;
        cs.name = contest.name;
        cs.durationSeconds = contest.durationSeconds;
        cs.startTimeSeconds = contest.startTimeSeconds;
        cs.link = contest.link;
        cs.type = contest.type;
        cs.platform = plt;
        contests.push(cs);
      });
    });
    
    await this.contestRepository.clear();
    await this.contestRepository.insert(contests);
    return contests;
  }

  async findAllFromDB(platform: string) {
    const contests: Contest[] = await this.contestRepository
      .createQueryBuilder('contest')
      .innerJoinAndSelect('contest.platform', 'platform')
      .where('UPPER(platform.name) = :platform', { platform: platform.toUpperCase() })
      .getMany();
  
    return contests;
  }

  async findAll(platform: IPlatform) {
    switch(platform) {
      case 'CODEFORCES':
        const cf_contest = await this.codeforcesService.getUpCommingContest();
        if(!cf_contest) 
          throw new NotFoundException({ status: 404, message: 'Fail to extract the contest from Codefoces.' })
        return cf_contest;

      case 'ATCODER':
        const ac_contests = await this.atCoderService.getUpCommingContest();
        if(!ac_contests)
          throw new NotFoundException({ status: 404, message: 'Fail to extract the contest from AtCoder.' })
        return ac_contests;

      default:
        throw new BadRequestException({ status: 400, message: `${platform} is not a valid platform for us.` });  
    }
  }

  async getContestById(platform: string, id: string) {
    const contest: Contest = await this.contestRepository
      .createQueryBuilder('contest')
      .innerJoinAndSelect('contest.platform', 'platform') 
      .where('UPPER(platform.name) = :plt AND contest.id = :id', { plt: platform.toUpperCase(), id })
      .getOne(); 

    if(!contest) {
      throw new NotFoundException({ status: 404, message: `The contest with id ${id} not found.` });
    }
    return contest;
  }
}

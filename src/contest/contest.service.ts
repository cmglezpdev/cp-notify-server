import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron } from '@nestjs/schedule';
import { Repository } from 'typeorm';

import { AtCoderService } from '../judges/atcoder.service';
import { CodeforcesService } from '../judges/codeforces.service';
import { PlatformService } from '../platform/platform.service';
import { Platform } from '../platform/entities/platform.entity';
import { Contest } from './entities/contest.entity';
import { CreateContestDto } from './dtos';

@Injectable()
export class ContestService {

  constructor(
    private readonly atCoderService: AtCoderService,
    private readonly codeforcesService: CodeforcesService,
    private readonly platformService: PlatformService,
    @InjectRepository(Contest)
    private readonly contestRepository: Repository<Contest>,
  ) { }

  async findAll(): Promise<Contest[]> {
    return this.contestRepository.find({});
  }

  async findById(id: string): Promise<Contest> {
    const contest = await this.contestRepository.findOneBy({ id });
    if (!contest) throw new BadRequestException(`The contests with id ${id} not found`);
    return contest;
  }

  async create(createContestDto: CreateContestDto): Promise<Contest> {
    const { platformId, ...rest } = createContestDto;
    const contest = this.contestRepository.create({
      ...rest,
      platform: { id: platformId }
    })

    await this.contestRepository.save(contest);
    return this.findById(createContestDto.id);
  }

  async findContests(platformId: number): Promise<Contest[]> {
    return this.contestRepository.find({
      where: {
        platform: { id: platformId }
      }
    })
  }

  @Cron('0 0 0 * * *')
  async updateContestsFromDBWithScrappers() {
    const platforms: Platform[] = await this.platformService.findAll();
    const promisesContests = platforms.map((plt) => this.findAllFromScrapper(plt.name));
    const resultPromises = await Promise.all(promisesContests);

    const createContests: Promise<Contest>[] = [];
    platforms.forEach(async (plt, i) => {
      resultPromises[i].forEach(contest => {
        createContests.push(
          this.create({
            ...contest,
            id: `${contest.id}`,
            platformId: plt.id
          })
        )
      });
    });

    const contests = await Promise.all(createContests);
    await this.contestRepository.clear();
    await this.contestRepository.insert(contests);
    return this.contestRepository.find({});
  }

  async findAllFromScrapper(platform: string) {
    switch (platform.toUpperCase()) {
      case 'CODEFORCES':
        const cf_contest = await this.codeforcesService.getUpCommingContest();
        if (!cf_contest)
          throw new NotFoundException({ status: 404, message: 'Fail to extract the contest from Codefoces.' })
        return cf_contest;

      case 'ATCODER':
        const ac_contests = await this.atCoderService.getUpCommingContest();
        if (!ac_contests)
          throw new NotFoundException({ status: 404, message: 'Fail to extract the contest from AtCoder.' })
        return ac_contests;

      default:
        throw new BadRequestException({ status: 400, message: `${platform} is not a valid platform for us.` });
    }
  }
}

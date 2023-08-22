import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron } from '@nestjs/schedule';
import { ILike, Repository } from 'typeorm';

import { AtCoderService } from '../judges/atcoder.service';
import { CodeforcesService } from '../judges/codeforces.service';
import { PlatformService } from '../platform/platform.service';
import { Platform } from '../platform/entities/platform.entity';
import { Contest } from './entities/contest.entity';
import { CreateContestDto } from './dtos';

@Injectable()
export class ContestService {

  private readonly logger = new Logger('ContestService');

  constructor(
    private readonly atCoderService: AtCoderService,
    private readonly codeforcesService: CodeforcesService,
    private readonly platformService: PlatformService,
    @InjectRepository(Contest)
    private readonly contestRepository: Repository<Contest>,
  ) { }

  async findAll(): Promise<Contest[]> {
    return this.contestRepository.find({ order: { startTimeSeconds: 'ASC' } });
  }

  async findById(id: string): Promise<Contest> {
    console.log(id);
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

    return this.contestRepository.save(contest);
  }

  async findContestsByName(platform: string): Promise<Contest[]> {
    return this.contestRepository.find({
      where: {
        platform: { name: ILike(platform) }
      }
    })
  }

  @Cron('0 0 0 * * *')
  async updateContestsFromDBWithScrappers() {
    const platforms: Platform[] = await this.platformService.findAll();
    const scrapperContests = await Promise.all(platforms.map(plt => this.findAllFromScrapper(plt.name)));

    const createContests: Promise<Contest>[] = [];
    platforms.forEach((plt, i) => {
      scrapperContests[i].forEach(contest => {
        createContests.push(
          this.create({
            ...contest,
            platformId: plt.id
          })
        )
      });
    });

    await this.contestRepository.clear();
    const xx = await Promise.all(createContests);
    this.logger.log('Database updated successfully')
    console.log("Database Updated succsefully");
    return xx;
  }

  async findAllFromScrapper(platform: string) {
    switch (platform.toUpperCase()) {
      case 'CODEFORCES':
        const cf_contest = await this.codeforcesService.getUpCommingContest();
        if (!cf_contest)
          throw new NotFoundException({ status: 404, message: 'Fail to extract the contests from Codeforces.' })
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

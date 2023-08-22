import { Controller, Get, Param, ParseIntPipe, Put } from '@nestjs/common';
import { ContestService } from './contest.service';
import { Contest } from './entities/contest.entity';

@Controller('contest')
export class ContestController {
  constructor(private readonly contestService: ContestService) { }

  @Get()
  findAll(): Promise<Contest[]> {
    return this.contestService.findAll();
  }

  @Get(':id')
  findById(
    @Param('id') id: string
  ): Promise<Contest> {
    return this.contestService.findById(id);
  }

  @Get('platform/:platform')
  getContests(
    @Param('platform') platform: string
  ): Promise<Contest[]> {
    return this.contestService.findContestsByName(platform);
  }

  @Put('/update')
  async updateContests() {
    return this.contestService.updateContestsFromDBWithScrappers();
  }

}

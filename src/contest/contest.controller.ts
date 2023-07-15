import { Controller, Get, Param } from '@nestjs/common';
import { ContestService } from './contest.service';
import { Platform } from 'src/contest/interfaces';

@Controller('contest')
export class ContestController {
  constructor(private readonly contestService: ContestService) {}

  @Get(':platform')
  async findAll(@Param('platform') platform: string) {
    const contests = await this.contestService.findAll(platform.toUpperCase() as Platform);
    return { status: 200, contests }
  }
}

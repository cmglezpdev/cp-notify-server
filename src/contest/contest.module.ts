import { Module } from '@nestjs/common';
import { ContestService } from './contest.service';
import { ContestController } from './contest.controller';
import { JudgesModule } from '../judges/judges.module';

@Module({
  controllers: [ContestController],
  providers: [ContestService],
  imports: [JudgesModule]
})
export class ContestModule {}

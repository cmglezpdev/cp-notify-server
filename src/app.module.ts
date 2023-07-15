import { Module } from '@nestjs/common';
import { ContestModule } from './contest/contest.module';
import { JudgesModule } from './judges/judges.module';

@Module({
  imports: [ContestModule, JudgesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ContestModule } from './contest/contest.module';
import { JudgesModule } from './judges/judges.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [ContestModule, JudgesModule, ProfileModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ContestService } from './contest.service';
import { ContestController } from './contest.controller';
import { JudgesModule } from '../judges/judges.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contest } from './entities/contest.entity';
import { Platform } from 'src/platform/entities/platform.entity';

@Module({
  controllers: [ContestController],
  providers: [ContestService],
  imports: [JudgesModule, TypeOrmModule.forFeature([Contest, Platform])]
})
export class ContestModule {}

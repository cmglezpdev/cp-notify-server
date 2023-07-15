import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { JudgesModule } from 'src/judges/judges.module';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [JudgesModule]
})
export class ProfileModule {}

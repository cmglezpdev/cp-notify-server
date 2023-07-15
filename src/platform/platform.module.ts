import { Module } from '@nestjs/common';
import { PlatformService } from './platform.service';
import { PlatformController } from './platform.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Platform } from './entities/platform.entity';

@Module({
  controllers: [PlatformController],
  providers: [PlatformService],
  imports: [TypeOrmModule.forFeature([Platform])]
})
export class PlatformModule {}

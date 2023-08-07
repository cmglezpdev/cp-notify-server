import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlatformService } from './platform.service';
import { PlatformController } from './platform.controller';
import { Platform } from './entities/platform.entity';

@Module({
  controllers: [PlatformController],
  providers: [PlatformService],
  exports: [PlatformService, TypeOrmModule],
  imports: [
    TypeOrmModule.forFeature([Platform])
  ],
})
export class PlatformModule { }

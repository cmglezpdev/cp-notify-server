import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { PlatformService } from './platform.service';
import { Platform } from './entities/platform.entity';

@Controller('platform')
export class PlatformController {
  constructor(
    private readonly platformService: PlatformService
  ) { }

  @Get()
  getPlatforms(): Promise<Platform[]> {
    return this.platformService.findAll();
  }

  @Get(':name')
  async getPlatformByName(@Param('name') name: string) {
    const platform = await this.platformService.findByName(name);
    if (!platform) throw new NotFoundException(`The platform ${name} not found in the database.`);
    return {
      status: 200,
      platform
    }
  }
}

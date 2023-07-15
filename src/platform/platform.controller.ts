import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { PlatformService } from './platform.service';
import { Platform } from './entities/platform.entity';

@Controller('platform')
export class PlatformController {
  constructor(
    private readonly platformService: PlatformService
  ) {}

  @Get()
  async getPlatforms() {
    const platforms: Platform[] = await this.platformService.getPlatforms();
    return {
      status: 200,
      platforms
    }
  }

  @Get(':name')
  async getPlatformByName(@Param('name') name: string) {
    const platform = await this.platformService.getPlatformByName(name);
    if(!platform) throw new NotFoundException(`The platform ${name} not found in the database.`);
    return {
      status: 200,
      platform
    }
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { IPlatform } from 'src/contest/interfaces';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @Get()
  async findProfile(@Query() query: any, @Query('platform') platform: IPlatform, @Query('handle') handle: string) {
    // TODO: hacer obligatorio la plataforma y el handle
    return query;
    
    const user = await this.profileService.getProfile(platform, handle);
    return { status: 200, user };
  }
}

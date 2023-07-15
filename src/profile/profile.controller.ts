import { Controller, Get, Query } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Platform } from 'src/contest/interfaces';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @Get()
  async findProfile(@Query('platform') platform: Platform, @Query('handle') handle: string) {
    // TODO: hacer obligatorio la plataforma y el handle
    const user = await this.profileService.getProfile(platform, handle);
    return { status: 200, user };
  }
}

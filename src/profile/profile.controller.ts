import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';

import { ProfileService } from './profile.service';
import { FindProfileDto } from './dtos';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @Get()
  async findProfile(@Query( ValidationPipe ) query: FindProfileDto) {
    const { handle, platform } = query;
    const user = await this.profileService.getProfile(platform, handle);
    return { status: 200, user };
  }
}

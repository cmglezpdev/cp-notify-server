import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';
import { AddHandleDto } from './dto/add-handle.dto';
import { GetUser } from './decorators/get-user.decorator';
import { Handle } from './entities/handle.entity';
import { Platform } from '../platform/entities/platform.entity';

@UseGuards(AuthGuard())
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  //! PROFILES (handles in the distinct platforms)
  @Get('profiles') // get all handles of the user in the distinct platforms
  getUserHandles(
    @GetUser(['id']) userId: string
  ): Promise<Handle[]> {
    return this.userService.getUserHandles(userId);
  }

  @Get('profile/:platform') // get the handle of a specific platform
  getUserHandleOfPlatform(
    @GetUser(['id']) userId: string,
    @Param('platform') platform: string
  ): Promise<Handle> {
    return this.userService.findUserHandleFromPlatform(userId, platform);
  }

  @Post('profile/:platformId') // add a new handle in a platform
  async addHandle(
    @GetUser(['id']) userId: string,
    @Param('platformId', ParseIntPipe) platformId: number,
    @Body() body: AddHandleDto
  ) {
    const { handle } = body;
    await this.userService.addHandle(userId, platformId, handle);
    return {
      status: 200,
      message: `The handle ${handle} was added with (user: ${userId} and platform: ${platformId}).`
    }
  }

  @Delete('profile/:platformId') // remove a handle in a platform
  async removeHandle(
    @GetUser(['id']) userId: string,
    @Param('platformId', ParseIntPipe) platformId: number,
  ) {
    await this.userService.removeUserHandles(userId, platformId);
    return { status: 200, message: `The handle of the platform ${platformId} was removed` };
  }



  //! Platforms (to show info of this platforms by each user)
  @Get("platforms") // select a platform
  getUserPlatforms(
    @GetUser(['id']) userId: string
  ): Promise<Platform[]> {
    return this.userService.getPlatformsOfUser(userId);
  }


  // TODO: Use an unique endpoint to add and remove the platforms
  @Post("platform/:platformId")
  async addPlatformByUser(
    @GetUser(['id']) userId: string,
    @Param('platformId', ParseIntPipe) platformId: number
  ) {
    await this.userService.addPlatformByUser(userId, platformId);
    return {
      status: 201,
      message: `The platform ${platformId} was added to the platforms list of the user ${userId}.`
    }
  }

  @Delete("platform/:platformId")
  async removePlatformFromUser(
    @GetUser(['id']) userId: string,
    @Param('platformId', ParseIntPipe) platformIds: number
  ) {
    await this.userService.removePlatformFromUser(userId, platformIds);
    return {
      status: 200,
      message: `The platform ${platformIds} was removed to the platforms list of the user ${userId}.`
    }
  }


}

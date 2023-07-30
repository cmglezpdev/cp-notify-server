import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { AddHandleDto } from './dto/add-handle.dto';
import { GetUser } from './decorators/get-user.decorator';

@UseGuards(AuthGuard())
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("platforms")
  async getUserPlatforms(@GetUser(['id']) userId: string) {
      const platforms = await this.userService.getPlatformsOfUser(userId);
      return {
        status: 200,
        platforms
      }
  }

  @Get('profiles')
  async getUserHandles( @GetUser(['id']) userId: string ) {
    const handles = await this.userService.getUserHandles(userId);
    return {
      status: 200,
      handles
    }
  }

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

  @Post('profile/:platformId')
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

  @Delete('profile/:platformId')
  async removeHandle(
    @GetUser(['id']) userId: string,
    @Param('platformId', ParseIntPipe) platformId: number,
  ){
    await this.userService.removeUserHandles(userId, platformId);
    return {status: 200, message: `The handle of the platform ${platformId} was removed`};
  }
}

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
  async getUserPlatforms(@GetUser(['id']) idUser: string) {
      const platforms = await this.userService.getPlatformsOfUser(idUser);
      return {
        status: 200,
        platforms
      }
  }

  @Post("platform/:idPlatform")
  async addPlatformByUser(
    @GetUser(['id']) idUser: string, 
    @Param('idPlatform', ParseIntPipe) idPlatforms: number
  ) {
    await this.userService.addPlatformByUser(idUser, idPlatforms);
    return {
      status: 201,
      message: `The platform ${idPlatforms} was added to the platforms list of the user ${idUser}.`
    }
  }

  @Delete("platform/:idPlatform")
  async removePlatformFromUser(
    @GetUser(['id']) idUser: string, 
    @Param('idPlatform', ParseIntPipe) idPlatforms: number
  ) {
    await this.userService.removePlatformFromUser(idUser, idPlatforms);
    return {
      status: 200,
      message: `The platform ${idPlatforms} was removed to the platforms list of the user ${idUser}.`
    }
  }

  @Post('handle/:platformId')
  async addHandle(
    @GetUser(['id']) userId: string, 
    @Param('platformId', ParseIntPipe) platformId: number,
    @Body() body: AddHandleDto
  ) {
    const { handle } = body;
    await this.userService.addPlatform(userId, platformId, handle);
    return {
      status: 200,
      message: `The handle ${handle} was added with (user: ${userId} and platform: ${platformId}).`
    }
  }
}

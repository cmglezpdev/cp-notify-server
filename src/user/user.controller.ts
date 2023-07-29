import { Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.userService.getUserById(id);
    return {
      status: 200,
      user
    }
  }

  @Post(":idUser/platform/:idPlatform")
  async addPlatformByUser(@Param('idUser') idUser: string, @Param('idPlatform', ParseIntPipe) idPlatforms: number) {
    await this.userService.addPlatformByUser(idUser, idPlatforms);
    return {
      status: 201,
      message: `The platform ${idPlatforms} was added to the platforms list of the user ${idUser}.`
    }
  }

  @Get(":idUser/platforms")
  async getUserPlatforms(@Param('idUser') idUser: string) {
      const platforms = await this.userService.getPlatformsOfUser(idUser);
      return {
        status: 200,
        platforms
      }
  }

  // TODO: Verificar que el usuario que añade o elimina las plataformas sea el mismo al que le añaden/eliminan plataformas

  @Delete(":idUser/platform/:idPlatform")
  async removePlatformFromUser(@Param('idUser') idUser: string, @Param('idPlatform', ParseIntPipe) idPlatforms: number) {
    await this.userService.removePlatformFromUser(idUser, idPlatforms);
    return {
      status: 201,
      message: `The platform ${idPlatforms} was removed to the platforms list of the user ${idUser}.`
    }
  }
}

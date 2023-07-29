import { BadRequestException, Get, Injectable, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Platform } from 'src/platform/entities/platform.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Platform)
        private readonly platformRepository: Repository<Platform>,
    ){}

    async getUserById(id: string) {
        const user = await this.userRepository.findOneBy({ id });
        if(!user) {
            throw new BadRequestException(`The user with id ${id} doesn't exits.`);
        }
        delete user.password;
        return user;
    }


    async addPlatformByUser(idUser: string, idPlatform: number) {
        const user = await this.userRepository.
            findOne({ where: { id: idUser }, relations: { platforms: true } });
        if(!user) throw new BadRequestException(`The id with id ${idUser} doesn't exist.`);
        const hasPlatform = user.platforms.some(platform => platform.id === idPlatform);
        if(hasPlatform) throw new BadRequestException(`The user ${idUser} already have selected the platform ${idPlatform}.`);
        
        const platform = await this.platformRepository.findOneBy({ id: idPlatform });
        user.platforms.push(platform);
        await this.userRepository.save(user);
        return user;
    }

    async getPlatformsOfUser(id: string) {
        const user = await this.userRepository.
            findOne({ where: { id }, relations: { platforms: true } });
        if(!user) {
            throw new BadRequestException(`The user with id ${id} doesn't exist.`);
        }

        return user.platforms;
    }
}

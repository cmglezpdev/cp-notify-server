import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Platform } from 'src/platform/entities/platform.entity';
import { Handle } from './entities/handle.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Platform)
        private readonly platformRepository: Repository<Platform>,
        @InjectRepository(Handle)
        private readonly handleRepository: Repository<Handle>,
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
        if(hasPlatform) throw new BadRequestException(`The user ${idUser} already has the platform ${idPlatform} selected.`);
        
        const platform = await this.platformRepository.findOneBy({ id: idPlatform });
        if(!platform) throw new BadRequestException(`The platform with id ${idPlatform} not found.`);
        user.platforms.push(platform);
        await this.userRepository.save(user);
        return user;
    }

    async removePlatformFromUser(idUser: string, idPlatform: number) {
        const user = await this.userRepository.
            findOne({ where: { id: idUser }, relations: { platforms: true } });
        if(!user) throw new BadRequestException(`The id with id ${idUser} doesn't exist.`);
        const hasPlatform = user.platforms.some(platform => platform.id === idPlatform);
        if(!hasPlatform) throw new BadRequestException(`The user ${idUser} hasn't selected the platform ${idPlatform}.`);
        
        user.platforms = user.platforms.filter(platform => platform.id !== idPlatform);
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

    async addPlatform(userId: string, platformId: number, handle: string) {
        const user = await this.userRepository.findOneBy({ id: userId });
        if(!user) throw new BadRequestException(`The user with id ${userId} doesn't exist.`);
        const platform = await this.platformRepository.findOneBy({ id: platformId });
        if(!platform) throw new BadRequestException(`The platform with id ${platformId} doesn't exist.`);
        
        const hasHandle = await this.handleRepository.findOneBy({ userId, platformId });
        if(hasHandle) throw new BadRequestException(`The user ${userId} already has a handle from the platform ${platformId}.`);
        const newHandle = { user, platform, handle };
        
        await this.handleRepository.save(newHandle);
    }
}

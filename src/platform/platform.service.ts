import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Platform } from './entities/platform.entity';

@Injectable()
export class PlatformService {
    constructor(
        @InjectRepository(Platform)
        private readonly platformRepository: Repository<Platform>
    ){}
    async getPlatforms() {
        const platforms: Platform[] = await this.platformRepository.find();
        return platforms;
    }

    async getPlatformByName(name: string) {
        const platform: Platform = await this.platformRepository.findOne({ where: { name: ILike(name) } });
        return platform;
    }
}

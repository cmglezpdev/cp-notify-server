import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
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
        const platform: Platform = await this.platformRepository
            .createQueryBuilder('platform')
            .where('UPPER(platform.name) = :name', { name: name.toUpperCase() })
            .getOne();

        return platform;
    }
}

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
        const platforms: Platform[] = await this.platformRepository.query(
            'SELECT * FROM platform WHERE UPPER(name) = $1;',
            [name.toUpperCase()]
        );
        if(platforms.length == 0) return null;
        return platforms[0];
    }
}

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { IPlatform } from 'src/contest/interfaces';
import { AtCoderService } from 'src/judges/atcoder.service';
import { CodeforcesService } from 'src/judges/codeforces.service';

@Injectable()
export class ProfileService {
    constructor(
        private readonly atCoderService: AtCoderService,
        private readonly codeforcesService: CodeforcesService
    ){}

    async getProfile(platform: string, handle: string) {
        switch(platform) {
            case 'ATCODER':
                const user = await this.atCoderService.getProfile(handle);
                if(!user) throw new NotFoundException({ status: 404, message: `The user ${handle} not found in AtCoder.` });
                return user;
            case 'CODEFORCES':
                const cfUser = await this.codeforcesService.getProfile(handle);
                if(!cfUser) throw new NotFoundException({ status: 404, message: `The user ${handle} not found in Codeforces.` });
                return cfUser;
            default:
                throw new BadRequestException({ status: 400, message: `${platform} isn\'t a valid platform for us.` });    
        }
    }
}

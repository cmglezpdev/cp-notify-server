import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Platform } from 'src/contest/interfaces';
import { AtCoderService } from '../judges/atcoder.service';
import { CodeforcesService } from '../judges/codeforces.service';

@Injectable()
export class ContestService {

  constructor(
    private readonly atCoderService: AtCoderService,
    private readonly codeforcesService: CodeforcesService
  ){}

  async findAll(platform: Platform) {
    switch(platform) {
      case 'CODEFORCES':
        const cf_contest = await this.codeforcesService.getUpCommingContest();
        if(!cf_contest) 
          throw new NotFoundException({ status: 404, message: 'Fail to extract the contest from Codefoces.' })
        return cf_contest;

      case 'ATCODER':
        const ac_contests = await this.atCoderService.getUpCommingContest();
        if(!ac_contests)
          throw new NotFoundException({ status: 404, message: 'Fail to extract the contest from AtCoder.' })
        return ac_contests;

      default:
        throw new BadRequestException({ status: 400, message: `${platform} is not a valid platform for us.` });  
    }
  }
}

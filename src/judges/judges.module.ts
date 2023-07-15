import { Module } from '@nestjs/common';
import { AtCoderService } from './atcoder.service';
import { CodeforcesService } from './codeforces.service';

@Module({
    providers: [AtCoderService, CodeforcesService],
    exports: [AtCoderService, CodeforcesService]
})
export class JudgesModule {}

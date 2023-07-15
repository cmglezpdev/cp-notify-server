import { chromium } from 'playwright';
import { Injectable } from '@nestjs/common';
import { IPlatformService, IJudgeUser } from './interfaces';
import { IContest, Platform } from 'src/contest/interfaces';
import { parseDate, timeToSeconds } from '../utils';

interface Contest {
    name:        string;
    link:        string;
    type:        string;
    start:       string;
    duration:    string;
    ratedRange:  string;
}

@Injectable()
export class AtCoderService implements IPlatformService {
    async getUpCommingContest(): Promise<IContest[] | null> {
        try {
            const browser = await chromium.launch();
    
            const page = await browser.newPage();
            await page.goto('https://atcoder.jp/contests');
            const tableUpcoming = await page.$('#contest-table-upcoming tbody');
            const contestInfo = await tableUpcoming?.$$('tr');
        
            const contests : Contest[] = [];
        
            if(contestInfo) {
                for(const contest of contestInfo) {
                    const items = await contest.$$('td');
                    const start = await items[0].textContent();
                    const duration = await items[2].textContent();
                    const ratedRange = await items[3].textContent();
                    
                    const a = await items[1].$('a');
                    const name = await a!.textContent();
                    const link = 'https://atcoder.jp' + (await a!.getAttribute('href'));
                    const classType = await (await items[1].$$('span'))[1].getAttribute('class');
                    const type = classType!.endsWith('blue') ? 'ABC' : classType!.endsWith('orange') ? 'ARC' : 'AGC';
        
                    contests.push({start: start!, name: name!, duration: duration!, ratedRange: ratedRange!, link, type});
                }
            }
        
            const generalContest : IContest[] = contests.map((contest, i) => {
                const { name, start, duration, link, type } = contest;
                const id = i + 1;
                const platform: Platform = 'ATCODER';
                const durationSeconds = timeToSeconds(duration);
                const startTimeSeconds = parseDate(start).getTime();
        
                return {id, name, platform, durationSeconds, startTimeSeconds, link, type};
            })
            
            await browser.close();        
            return generalContest;

        } catch (error) {
            return null;
        }
    }
    async getProfile(handle: string): Promise<IJudgeUser | null> {
        try {
            const browser = await chromium.launch();
            const page = await browser.newPage();
            await page.goto(`https://atcoder.jp/users/${handle}`);

            const rating = await (await page.$('table.dl-table > tbody > tr:nth-child(2) > td > span:first-child'))?.textContent();
            const maxRating = await (await page.$('table.dl-table > tbody > tr:nth-child(3) > td > span:first-child'))?.textContent();
            const rank = await (await page.$('h3 > b'))?.textContent();

            const user: IJudgeUser = {
                handle: handle,
                rating: parseInt(rating!),
                maxRating: parseInt(maxRating!),
                rank: rank!
            }
            
            return user;
        } catch (e) {
            return null;   
        }
    }
}



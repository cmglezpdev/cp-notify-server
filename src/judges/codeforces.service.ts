import { Injectable } from "@nestjs/common";
import { ICodeforcesContestsResponse, IPlatformService, IJudgeUser } from "./interfaces";
import { IContest } from "src/contest/interfaces";


@Injectable()
export class CodeforcesService implements IPlatformService {
    async getUpCommingContest(): Promise<IContest[] | null> {
        try {
            const response: Response = await fetch('https://codeforces.com/api/contest.list', { method: "GET" });
            const CodeforcesResponse: ICodeforcesContestsResponse = await response.json();
            const upcomingContests = CodeforcesResponse.result.filter(contest => contest.phase === "BEFORE");

            upcomingContests.sort((contestA, contestB) => contestA.startTimeSeconds - contestB.startTimeSeconds);

            const contests: IContest[] = upcomingContests.map(contest => ({
                id: `${contest.id}`,
                name: contest.name,
                type: contest.type,
                platform: 'CODEFORCES',
                durationSeconds: contest.durationSeconds,
                startTimeSeconds: contest.startTimeSeconds * 1000,
                link: `https://codeforces.com/contests/${contest.id}`,
            }))

            return contests;
        } catch (e) {
            return null;
        }
    }

    async getProfile(handle: string): Promise<IJudgeUser | null> {
        const urlCodeforces = `https://codeforces.com/api/user.info?handles=${handle}`;
        const response: Response = await fetch(urlCodeforces, { method: 'GET' });
        const resp = await response.json();
        if (resp.status === 'OK') {
            const { rating, maxRating, rank } = resp.result[0];

            const user: IJudgeUser = {
                handle,
                rating: parseInt(rating!),
                maxRating: parseInt(maxRating!),
                rank: rank!
            }

            return user;
        } else {
            return null;
        }
    }

}
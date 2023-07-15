
export interface IContest {
    id:               string;
    name:             string;
    platform:         Platform;
    durationSeconds:  number;
    startTimeSeconds: number;
    link:             string;
    type:             string;
}

export type Platform = 
 | 'CODEFORCES'
 | 'ATCODER';
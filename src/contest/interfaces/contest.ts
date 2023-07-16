
export interface IContest {
    id:               string;
    name:             string;
    platform:         IPlatform;
    durationSeconds:  number;
    startTimeSeconds: number;
    link:             string;
    type:             string;
}

export type IPlatform = 
 | 'CODEFORCES'
 | 'ATCODER';
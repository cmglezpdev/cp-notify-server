import { IJudgeUser } from './JudgeUser';

// CONTEST
export interface ICodeforcesContestsResponse {
    status: string;
    result: ICodeforcesContest[];
}

export interface ICodeforcesContest {
    id:                  number;
    name:                string;
    type:                Type;
    phase:               Phase;
    frozen:              boolean;
    durationSeconds:     number;
    startTimeSeconds:    number;
    relativeTimeSeconds: number;
}

export enum Phase {
    Before = "BEFORE",
    Finished = "FINISHED",
    Coding = "CODING",
    PendingSystemTest = "PENDING_SYSTEM_TEST",
    SystemTest = "SYSTEM_TEST",
}

export enum Type {
    CF = "CF",
    Icpc = "ICPC",
    Ioi = "IOI",
}


// USER
export interface ICodeforcesUser {
    status: string;
    result: IJudgeUser[];
}


import { IContest } from "../../contest/interfaces";
import { IJudgeUser } from "./JudgeUser";

export interface IPlatformService {
    getUpCommingContest: () => Promise<IContest[] | null>;
    getProfile: (handle: string) => Promise<IJudgeUser | null>;
}

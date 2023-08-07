import { IsNumber, IsOptional, IsPositive, IsString, IsUrl, MinLength } from "class-validator";

export class CreateContestDto {
    @IsString()
    id: string;

    @IsString()
    @MinLength(3)
    name: string;

    @IsNumber()
    @IsPositive()
    durationSeconds: number;

    @IsNumber()
    @IsPositive()
    startTimeSeconds: number;

    @IsString()
    @IsUrl()
    link: string;

    @IsString()
    @IsOptional()
    type?: string;

    @IsString()
    platformId: number;
}
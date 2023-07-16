import { IsString } from 'class-validator';

export class FindProfileDto {
    @IsString()
    platform: string;
    
    @IsString()
    handle: string;
}
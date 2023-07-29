import { IsNumber, IsString } from "class-validator";


export class AddHandleDto {

    @IsNumber()
    platformId: number;

    @IsString()
    handle: string;
}
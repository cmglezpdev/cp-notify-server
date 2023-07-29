import { IsString } from "class-validator";


export class AddHandleDto {
    
    @IsString()
    handle: string;
}
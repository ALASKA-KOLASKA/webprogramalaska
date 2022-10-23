import {ApiProperty} from "@nestjs/swagger";
import {IsDefined, IsNotEmpty, IsString} from "class-validator";

export class LoginUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    username: string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    password: string;
}

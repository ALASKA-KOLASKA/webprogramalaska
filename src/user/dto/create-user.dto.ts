import {ApiProperty} from "@nestjs/swagger";
import {IsDefined, IsEmail, IsNotEmpty, IsString} from "class-validator";


export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  password: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  username: string;
}

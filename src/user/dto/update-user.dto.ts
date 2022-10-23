import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsOptional, IsString} from "class-validator";


export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  email?: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password?: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  username?: string;
}

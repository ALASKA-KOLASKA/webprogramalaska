import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsOptional, IsString} from "class-validator";


export class UpdateTeamDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  instUrl?: string;
}

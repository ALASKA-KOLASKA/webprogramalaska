import {ApiProperty} from "@nestjs/swagger";
import {IsDefined, IsNotEmpty, IsOptional, IsString} from "class-validator";


export class UpdateMemberDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  name?: string;
}

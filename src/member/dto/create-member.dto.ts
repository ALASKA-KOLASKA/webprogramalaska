import {ApiProperty} from "@nestjs/swagger";
import {IsDefined, IsNotEmpty, IsString} from "class-validator";


export class CreateMemberDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  name: string;
}

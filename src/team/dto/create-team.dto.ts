import {ApiProperty} from "@nestjs/swagger";
import {IsDefined, IsNotEmpty, IsNumber, IsString} from "class-validator";


export class CreateTeamDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  instUrl: string;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  captainId: number;
}

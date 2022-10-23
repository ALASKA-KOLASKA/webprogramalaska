import {ApiProperty} from "@nestjs/swagger";
import {IsDefined, IsNotEmpty, IsString} from "class-validator";


export class CreatePerformanceDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  name: string;
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  date: Date;
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  venue: string;
}

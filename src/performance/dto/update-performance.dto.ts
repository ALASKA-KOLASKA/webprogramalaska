import {ApiProperty} from "@nestjs/swagger";
import {IsDefined, IsNotEmpty, IsOptional, IsString} from "class-validator";


export class UpdatePerformanceDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  name?: string;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  date?: Date;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  venue?: string;
}

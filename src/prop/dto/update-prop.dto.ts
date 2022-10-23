import {ApiProperty} from "@nestjs/swagger";
import {IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";


export class UpdatePropDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  name?: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  price?: number;
}

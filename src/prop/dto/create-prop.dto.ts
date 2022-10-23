import {ApiProperty} from "@nestjs/swagger";
import {IsDefined, IsNotEmpty, IsNumber, IsString, Min} from "class-validator";


export class CreatePropDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  name: string;
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty()
  @Min(0)
  price: number;
}

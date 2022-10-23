import {ApiProperty} from "@nestjs/swagger";
import {IsOptional} from "class-validator";

export class ConnectUserDto {
    @ApiProperty()
    id?: number;
    @ApiProperty()
    email?: string;
    @ApiProperty()
    username?: string;
  }
  
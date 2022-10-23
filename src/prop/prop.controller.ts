import {
  Get,
  Post,
  Delete,
  Param,
  Controller,
  NotImplementedException,
  Body, Query, ParseIntPipe, UseGuards, ParseFloatPipe, DefaultValuePipe,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiCookieAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PropService } from './prop.service';
import { CreatePropDto } from './dto/create-prop.dto';
import { Prop } from '@prisma/client';
import {AuthGuard} from "../auth/auth.guard";


@ApiTags('prop')
@Controller('prop')
export class PropController {
  constructor(private readonly propService: PropService) {}

  @ApiOperation({
    summary: 'Get prop by id',
  })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadRequestResponse({ description: 'Invalid request.' })
  @ApiOkResponse({ description: 'Prop was found.' })
  @Get(':id')
  async getProp(@Param('id', ParseIntPipe) id: number): Promise<Prop> {
    return this.propService.getProp({ id: id })
  }



  @ApiOperation({
    summary: 'Add prop',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadRequestResponse({ description: 'Invalid request.' })
  @ApiCreatedResponse({ description: 'Prop was created.' })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @Post()
  async addProp(@Body() prop: CreatePropDto): Promise<Prop> {
    return this.propService.addProp(prop)
  }

  @ApiOperation({
    summary: 'Delete prop by id',
  })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadRequestResponse({ description: 'Invalid request.' })
  @ApiOkResponse({ description: 'Prop was deleted.' })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteProp(@Param('id', ParseIntPipe) id: number): Promise<Prop> {
    return this.propService.deleteProp({id: id});
  }

  @ApiOperation({
    summary: 'Get props',
  })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadRequestResponse({ description: 'Invalid request.' })
  @ApiOkResponse({ description: 'Successful request.' })
  @ApiQuery({
    name: "name",
    type: String,
    required: false
  })
  @ApiQuery({
    name: "startPrice",
    type: Number,
    required: true
  })
  @ApiQuery({
    name: "endPrice",
    type: Number,
    required: true
  })
  @Get()
  async getProps(@Query('name') name?: string,
                 @Query('startPrice', ParseIntPipe) startPrice?: number,
                 @Query('endPrice', ParseIntPipe) endPrice?: number): Promise<Prop[] | null > {
    return this.propService.getProps(name, startPrice, endPrice);
  }
}

import {
  Get,
  Post,
  Param,
  Controller,
  NotImplementedException,
  Body, Query, ParseIntPipe, UseGuards,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiCookieAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PerformanceService } from './performance.service';
import { CreatePerformanceDto } from './dto/create-performance.dto';
import { Performance} from '@prisma/client';
import {AuthGuard} from "../auth/auth.guard";


@ApiTags('performance')
@Controller('performance')
export class PerformanceController {
  constructor(private readonly performanceService: PerformanceService) {
  }

  @ApiOperation({
    summary: 'Get performance by id.',
  })
  @ApiNotFoundResponse({description: 'Not found'})
  @ApiForbiddenResponse({description: 'Forbidden.'})
  @ApiBadRequestResponse({description: 'Invalid request.'})
  @ApiOkResponse({description: 'Performance was found.'})
  @Get(':id')
  async getPerformance(@Param('id', ParseIntPipe) id: number): Promise<Performance> {
    return this.performanceService.getPerformance({id: id})
  }

  @ApiOperation({
    summary: 'Get performances.',
  })
  @ApiNotFoundResponse({description: 'Not found'})
  @ApiForbiddenResponse({description: 'Forbidden.'})
  @ApiBadRequestResponse({description: 'Invalid request.'})
  @ApiOkResponse({description: 'Successful request.'})
  @ApiQuery({
    name: "venue",
    type: String,
    required: false
  })
  @ApiQuery({
    name: "performanceName",
    type: String,
    required: false
  })
  @Get()
  async getPerformances(@Query('venue') venue?: string,
                        @Query('performanceName') performanceName?: string,
  ): Promise<Performance[]> {
    return this.performanceService.getPerformances(venue, performanceName);
  }

  @ApiOperation({
    summary: 'Add new performance',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadRequestResponse({ description: 'Invalid request.' })
  @ApiCreatedResponse({ description: 'Performance was created.' })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @Post()
  async addPerformance(
    @Body() performance: CreatePerformanceDto,
  ): Promise<Performance> {
    return this.performanceService.addPerformance(performance)
  }
}

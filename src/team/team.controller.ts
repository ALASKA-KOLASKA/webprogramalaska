import {
  Get,
  Post,
  Delete,
  Param,
  Controller,
  Body,
  Query, ParseIntPipe, UseGuards,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiCookieAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './entities/team.entity';
import {AuthGuard} from "../auth/auth.guard";


@ApiTags('team')
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}


  @ApiOperation({
    summary: 'Get team by Id.',
  })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadRequestResponse({ description: 'Invalid request.' })
  @ApiOkResponse({ description: 'Team was found.' })
  @Get(':id')
  async getTeam(@Param('id', ParseIntPipe) id: number): Promise<Team> {
    return this.teamService.getTeam({ id: id })
  }

  @ApiOperation({
    summary: 'Get teams',
  })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadRequestResponse({ description: 'Invalid request.' })
  @ApiOkResponse({ description: 'Teams was found.' })
  @ApiQuery({
    name: "name",
    type: String,
    required: false
  })
  @ApiQuery({
    name: "captainName",
    type: String,
    required: false
  })
  @Get()
  async getTeams(@Query('name') name?: string, @Query('captainName') captainName?: string): Promise<Team[] | null> {
    return this.teamService.getTeams(name, captainName)
  }

  @ApiOperation({
    summary: 'Add new team',
  })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadRequestResponse({ description: 'Invalid request.' })
  @ApiCreatedResponse({ description: 'Team was created.' })
  @Post()
  async addTeam(@Body() team: CreateTeamDto): Promise<Team> {
    return this.teamService.addTeam(team)
  }


  @ApiOperation({
    summary: 'Delete team by id',
  })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadRequestResponse({ description: 'Invalid request.' })
  @ApiOkResponse({ description: 'Team was deleted.' })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteTeam(@Param('id', ParseIntPipe) id: number): Promise<Team> {
    return this.teamService.deleteTeam({ id: id })
  }
}

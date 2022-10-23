import {
  Get,
  Post,
  Delete,
  Param,
  Controller,
  Body, Query, ParseIntPipe, UseGuards,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiCookieAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse,
  ApiOperation, ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from '@prisma/client';
import {AuthGuard} from "../auth/auth.guard";


@ApiTags('member')
@Controller('member')
export class MemberContorller {
  constructor(private readonly memberService: MemberService) {}

  @ApiOperation({
    summary: 'Get member',
  })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadRequestResponse({ description: 'Invalid request.' })
  @ApiOkResponse({ description: 'Member was found.' })
  @Get(':id')
  async getMember(@Param('id', ParseIntPipe) id: number): Promise<Member> {
    return this.memberService.getMember({id: id});
  }

  @ApiOperation({
    summary: 'Get members',
  })
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadRequestResponse({ description: 'Invalid request.' })
  @ApiOkResponse({ description: 'Successful request for members.' })
  @Get()
  @ApiQuery({
    name: "name",
    type: String,
    required: false
  })
  async getMembers(@Query("name") name?: string,
  @Query('take', ParseIntPipe) take: number = 1,
  @Query('skip', ParseIntPipe) skip: number = 0): Promise<Member[]> {
    if (name != null) {
      return this.memberService.getMembers({name: name});
    } else {
      return this.memberService.getAllMembers(take, skip);
    }
  }


  @ApiOperation({
    summary: 'Add new member',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadRequestResponse({ description: 'Invalid request.' })
  @ApiCreatedResponse({ description: 'Member was created.' })
  @Post()
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  async addMember(@Body() member: CreateMemberDto): Promise<Member> {
    return this.memberService.addMember(member);
  }

  @ApiOperation({
    summary: 'Delete member by id',
  })
  @ApiCreatedResponse( {description: "Member was created"})
  @ApiNotFoundResponse({ description: 'Not found' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBadRequestResponse({ description: 'Invalid request.' })
  @ApiOkResponse({ description: 'Member was delete.' })
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteMember(@Param('id', ParseIntPipe) id: number): Promise<Member> {
    return this.memberService.deleteMember({id: id});
  }
}

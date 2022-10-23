import {
    Get,
    Post,
    Delete,
    Param,
    Controller,
    Body,
    ParseIntPipe,
} from '@nestjs/common'
import { UserService } from './user.service'
import { User } from '@prisma/client'

import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOperation,
    ApiParam,
    ApiTags
} from '@nestjs/swagger'
import { CreateUserDto } from './dto/create-user.dto'

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor (private readonly userService: UserService) {}

    @ApiOperation({
        summary: 'Add user'
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @ApiBadRequestResponse({ description: 'Invalid request.' })
    @ApiCreatedResponse({ description: 'User was created.' })
    @Post()
    async addUser (@Body() User: CreateUserDto): Promise<User> {
        return await this.userService.addUser(User)
    }

}
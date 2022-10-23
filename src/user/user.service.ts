import {
    BadRequestException, ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service'
import { Prisma,  User } from '@prisma/client'
import { BadRequestExceptionFilter } from '../filters/BadRequestExceptionFilter.filter';
import { ForbiddenExceptionFilter } from '../filters/ForbiddenExceptionFilter.filter';

@Injectable()
export class UserService {
    constructor (private dbService: PrismaService) {}

    async addUser (data: Prisma.UserCreateInput): Promise<User> {
        const user = await this.dbService.user.count({
            where: {username: data.username}
        })
        const alreadyExistsEmail = await this.dbService.user.count({
            where: { email: data.email },
        });
        if (alreadyExistsEmail != 0) {
            throw new BadRequestException(
                "User with this email address already exists"
            );
        }
        if (user != 0) {
            throw new BadRequestException('User with login already create')
        }
        return this.dbService.user.create({
            data
        })
    }
}

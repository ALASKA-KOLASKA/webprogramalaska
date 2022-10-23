import { Injectable } from '@nestjs/common'
import { MessageEntity } from './message.entity'
import { PrismaService } from '../prisma.service'

@Injectable()
export class MessagesService {
    constructor (private readonly dbService: PrismaService) {}

    async save (author: string, data: string, date: string) {
        const message = new MessageEntity()
        message.author = author
        message.message = data
        message.date = date
        await this.dbService.message.create({
            data: {
                author,
                message: data
            }
        })
    }

    async getAllMessages () {
        return await this.dbService.message.findMany()
    }
}

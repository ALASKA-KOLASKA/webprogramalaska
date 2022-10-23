import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect
} from '@nestjs/websockets'
import { Socket, Server } from 'socket.io'
import { JwtService } from '@nestjs/jwt'
import { MessagesService } from './messages.service'

@WebSocketGateway()
export class Gateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor (
        private jwtService: JwtService,
        private messageService: MessagesService
    ) {}

    @WebSocketServer() server: Server

    @SubscribeMessage('message')
    async handleMessage (client: Socket, payload: any) {
        console.log(payload)
        const author =
            payload.token === ''
                ? 'Anonymous'
                : this.jwtService.verify(payload.token).username
        await this.messageService.save(author, payload.data, payload.date)

        const answer = {
            username: author,
            data: payload.data,
            date: payload.date
        }
        this.server.emit('message', answer)
    }

    afterInit (server: Server): any {
        console.log('init')
    }

    handleConnection (client: Socket, ...args: any[]): any {
        console.log('client connected: ' + client.id)
    }

    handleDisconnect (client: any): any {
        console.log('client disconnected: ' + client.id)
    }
}

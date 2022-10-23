import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    BadRequestException
} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(BadRequestException)
export class BadRequestExceptionForLoginFilter implements ExceptionFilter {
    catch (exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        const status = exception.getStatus()

        return response.status(status).render('new_login.pug', {
            description: exception.message,
            status
        })
    }
}

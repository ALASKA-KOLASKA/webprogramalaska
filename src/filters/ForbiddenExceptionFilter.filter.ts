import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    ForbiddenException
} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter implements ExceptionFilter {
    catch (exception: ForbiddenException, host: ArgumentsHost) {
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

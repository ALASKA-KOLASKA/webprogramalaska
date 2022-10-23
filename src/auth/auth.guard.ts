import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs'
import { JwtService } from '@nestjs/jwt'
import { Request, Response } from 'express'
import jwt_decode, { JwtPayload } from 'jwt-decode'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor (private jwtService: JwtService) {}
    canActivate (
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const req: Request = context.switchToHttp().getRequest<Request>()
        const token = req.cookies.auth_token

        if (!token) {
            throw new ForbiddenException('The user is not authorized')
        } else {
            const decodedPayload: JwtPayload = jwt_decode(token)
            if (Date.now() >= decodedPayload.exp * 1000) {
                const response: Response = context
                    .switchToHttp()
                    .getResponse<Response>()
                response.clearCookie('auth_token')

                throw new ForbiddenException('The user is not authorized')
            }

            req.cookies.user = this.jwtService.verify(token)
            return true
        }
    }
}

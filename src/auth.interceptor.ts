import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    ForbiddenException,
} from "@nestjs/common";
import { map, Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { Request, Response } from "express";
import jwt_decode, { JwtPayload } from "jwt-decode";

@Injectable()
export class AuthenticationInterceptor<T>
    implements NestInterceptor<T, Response<T>>
{
    constructor(private jwtService: JwtService) {}

    intercept(
        context: ExecutionContext,
        next: CallHandler
    ): Observable<Response<T>> {
        const http = context.switchToHttp();
        const req: Request = http.getRequest<Request>();

        return next.handle().pipe(
            map((data) => {
                const token = req.cookies.auth_token;
                if (token) {
                    const decodedPayload: JwtPayload = jwt_decode(token);
                    if (Date.now() >= decodedPayload.exp * 1000) {
                        const response: Response = context
                            .switchToHttp()
                            .getResponse<Response>();
                        response.clearCookie("auth_token");

                        throw new ForbiddenException("The user is not authorized");
                    }
                    return {
                        ...data,
                        user: this.jwtService.verify(token),
                    };
                } else {
                    return { ...data };
                }
            })
        );
    }
}

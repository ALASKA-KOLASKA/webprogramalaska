import {
    BadRequestException,
    Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { AuthResponse } from "./auth.response";
import { Response } from "express";
import { PrismaService } from "../prisma.service";
import { LoginUserDto } from "../user/dto/login-user.dto";
import { CreateUserDto } from "../user/dto/create-user.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly dbService: PrismaService
    ) {}

    async login(dto: LoginUserDto, response: Response): Promise<AuthResponse> {
        return this.dbService.user
            .findFirst({ where: { username: dto.username } })
            .then((user) => {
                if (!user) {
                    throw new BadRequestException("Wrong username");
                }
                if (dto.password != user.password){
                    throw new BadRequestException("Wrong password");
                }
                const token = this.jwtService.sign({ username: dto.username });
                response.cookie("auth_token", token);
                return {
                    token,
                    user,
                };
            });
    }

    async register(
        dto: CreateUserDto,
        response: Response
    ): Promise<AuthResponse> {

        return this.userService.addUser(dto).then((user) => {
          this.dbService.user.findFirst({ where: { username: dto.username } })
            const token = this.jwtService.sign({ username: dto.username });
            response.cookie("auth_token", token);
            return {
                token,
                user,
            };
        });
    }

    async logout(response: Response) {
        response.clearCookie("auth_token");
    }
}

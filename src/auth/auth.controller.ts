import {
    ApiBadRequestResponse, ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiNotFoundResponse,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthResponse } from "./auth.response";
import { Response } from "express";
import { LoginUserDto } from "../user/dto/login-user.dto";
import { CreateUserDto } from "../user/dto/create-user.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({
        summary: "Login by username and password",
    })
    @ApiNotFoundResponse({ description: 'User not found' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @ApiBadRequestResponse({ description: 'Wrong password or login.' })
    @ApiCreatedResponse({ description: 'Register new user.' })
    @Post("/login")
    async login(
        @Body() dto: LoginUserDto,
        @Res({ passthrough: true }) response: Response
    ): Promise<AuthResponse> {
        return this.authService.login(dto, response);
    }

    @ApiOperation({
        summary: "Register new user",
    })
    @ApiNotFoundResponse({ description: 'Not found' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @ApiBadRequestResponse({ description: 'User already exists.' })
    @ApiCreatedResponse({ description: 'Register new user.' })
    @Post("/register")
    async register(
        @Body() dto: CreateUserDto,
        @Res({ passthrough: true }) response: Response
    ): Promise<AuthResponse> {
        return this.authService.register(dto, response);
    }
}

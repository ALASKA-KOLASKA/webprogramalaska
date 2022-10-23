import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  Res,
  UseFilters,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { LoggingInterceptor } from './interceptor';
import { ApiExcludeController } from '@nestjs/swagger';
import {AuthenticationInterceptor} from "./auth.interceptor";
import {AuthGuard} from "./auth/auth.guard";
import {AuthResponse} from "./auth/auth.response";
import {CreateUserDto} from "./user/dto/create-user.dto";
import {AppService} from "./app.service";
import {AuthService} from "./auth/auth.service";
import { Response } from "express";
import {LoginUserDto} from "./user/dto/login-user.dto";
import {MessagesService} from "./messages/messages.service";
import {BadRequestExceptionForRegisterFilter} from "./filters/BadRequestForRegistrFIlter";
import {BadRequestExceptionForLoginFilter} from "./filters/BadRequestForLoginFilter";

@ApiExcludeController()
@UseInterceptors(LoggingInterceptor, AuthenticationInterceptor)
@Controller('')
export class AppController {
  constructor(
      private readonly appService: AppService,
      private readonly authSerivce: AuthService,
      private readonly messageService: MessagesService
  ) {}
  @Get()
  @Render('index')
  root() {
    return {};
  }

  @Get('Galerie')
  @Render('Galerie')
  galerie() {
    return {}
  }

  @Get('cards')
  @Render('cards')
  cards() {
    return {}
  }

  @Get('logged')
  @Render('testlogin')
  logged() {
    return { logged: true}
  }

  @Get('notlogged')
  @Render('testlogin')
  notlogged() {
    return { logged: false}
  }

  @UseGuards(AuthGuard)
  @Get('list_members')
  @Render('list_members')
  getcarrier () {
    return { }
  }

  @Get("/login")
  @Render("new_login")
  getLoginPage() {
    return {};
  }

  @Get("/register")
  @Render("register")
  getRegisterPage() {
    return {};
  }


  @UseFilters(BadRequestExceptionForLoginFilter)
  @Post("login")
  @Redirect("/")
  async login(
      @Body() dto: LoginUserDto,
      @Res({ passthrough: true }) response: Response
  ): Promise<AuthResponse> {
    return this.authSerivce.login(dto, response);
  }

  @UseFilters(BadRequestExceptionForRegisterFilter)
  @Post("register")
  @Redirect("/")
  async register(
      @Body() dto: CreateUserDto,
      @Res({ passthrough: true }) response: Response
  ): Promise<AuthResponse> {
    return this.authSerivce.register(dto, response);
  }

  @Get("logout")
  @Redirect("/login")
  async logout(@Res({ passthrough: true }) response: Response) {
    return this.authSerivce.logout(response);
  }

  @Get('chat')
  @Render('chat')
  async chat () {
    return {
      messages: await this.messageService.getAllMessages()
    }
  }
}

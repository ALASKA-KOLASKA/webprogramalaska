import { Module } from '@nestjs/common';

import {PropController} from "./prop.controller";
import {PropService} from "./prop.service";
import { PrismaService } from "../prisma.service";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [AuthModule],
    controllers: [PropController],
    providers: [PropService, PrismaService],
})
export class PropModule {}

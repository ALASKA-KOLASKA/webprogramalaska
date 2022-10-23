import { Module } from '@nestjs/common';

import {MemberContorller} from "./member.contorller";
import {MemberService} from "./member.service";
import {PrismaService} from "../prisma.service";
import {AuthModule} from "../auth/auth.module";

@Module({
    controllers: [MemberContorller],
    imports: [AuthModule],
    providers: [MemberService, PrismaService],
    }
)
export class MemberModule {}

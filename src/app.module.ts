import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { PerformanceModule } from './performance/performance.module';
import { MemberModule } from './member/member.module';
import { PropModule } from './prop/prop.module';
import { TeamModule } from './team/team.module';
import {RouterModule} from "nest-router";
import {routes} from "./routes";
import { AuthModule } from './auth/auth.module';
import {Gateway} from "./messages/gateway";
import {UserModule} from "./user/user.module";
import {MessagesModule} from "./messages/messages.module";

@Module({
  imports: [RouterModule.forRoutes(routes),
    PerformanceModule, MemberModule, PropModule, TeamModule, AuthModule, UserModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, Gateway],
})
export class AppModule {}


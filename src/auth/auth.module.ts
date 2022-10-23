import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserService } from "../user/user.service";
import { PrismaService } from "../prisma.service";

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: "jwt",
            property: "user",
            session: false,
        }),
        JwtModule.register({
            secret: "process.env.SECRETKEY",
            signOptions: {
                expiresIn: "1h",
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService, PrismaService],
    exports: [PassportModule, JwtModule, AuthService],
})
export class AuthModule {}

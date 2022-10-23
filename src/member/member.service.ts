import { Injectable, NotFoundException } from "@nestjs/common";
import { Member, Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";

@Injectable()
export class MemberService {
    constructor(private prismaService: PrismaService) {
    }


    async getMember(id: Prisma.MemberWhereUniqueInput): Promise<Member | null> {
        const member = await this.prismaService.member.count({
            where: id
        })
        if (member == 0) {
            throw new NotFoundException('Member not found')
        }
        return this.prismaService.member.findUnique({
            where: id
        })
    }

    async getMembers(name: Prisma.MemberWhereInput): Promise<Member[] | null> {
        return this.prismaService.member.findMany({
            where: name
            },
        );
    }

    async addMember(data: Prisma.MemberCreateInput): Promise<Member> {
        return this.prismaService.member.create({
            data,
        })
    }

    async deleteMember(where: Prisma.MemberWhereUniqueInput): Promise<Member> {
        const member = await this.prismaService.member.count({
            where: where
        })
        if (member == 0) {
            throw new NotFoundException('Member not found')
        }
        return this.prismaService.member.delete({
            where,
        });
    }

    async getAllMembers(take: number = 10,
                        skip: number = 0): Promise<Member[] | null> {
        return this.prismaService.member.findMany({ skip, take })
    }
}
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Member, Performance, Prisma } from '@prisma/client';

@Injectable()
export class PerformanceService {

    constructor(private prismaService: PrismaService) {
    }

    async getPerformance(id: Prisma.PerformanceWhereUniqueInput): Promise<Performance | null> {
        const performance = await this.prismaService.performance.count({
            where: id
        })
        if (performance == 0) {
            throw new NotFoundException('Performance not found')
        }
        return this.prismaService.performance.findUnique({
            where: id,
        })
    }
    async addPerformance(data: Prisma.PerformanceCreateInput): Promise<Performance> {
        return this.prismaService.performance.create({
            data,
        })
    }

    async getPerformances(venue: string, performanceName: string): Promise<Performance[] | null> {
        return this.prismaService.performance.findMany({
                    where: {
                        venue: venue,
                        name: performanceName,
                    }
                })
    }
}
import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {Prisma, Team} from '@prisma/client';
import {CreateTeamDto} from "./dto/create-team.dto";

@Injectable()
export class TeamService {
  constructor(private prismaService: PrismaService) {
  }

  async getTeam(id: Prisma.TeamWhereUniqueInput): Promise<Team | null> {
    const team = await this.prismaService.team.count({
      where: id
    })
    if (team == 0) {
      throw new NotFoundException('Team not found')
    }
    return this.prismaService.team.findUnique({
      where: id,
    })
  }

  async addTeam(data: CreateTeamDto): Promise<Team> {
    const checkCaptain = await this.prismaService.member.count({
      where: { id: data.captainId },
    });
    if (checkCaptain == 0) {
      throw new BadRequestException("Captain(member) with such id not found");
    }
    return this.prismaService.team.create({
      data: {
        name: data.name,
        instUrl: data.instUrl,
        captain: {connect: {id: data.captainId}}
      }
    })
  }

  async getTeams(name: string, captainName: string): Promise<Team[] | null> {
    if (captainName != null) {
      const captainCheck = await this.prismaService.member.count({
        where: {
          name: captainName
        }

      });
      if (captainCheck == 0) {
        return await this.prismaService.team.findMany({
          where: {
            id: 0
          }
        })
      }
      const captain = await this.prismaService.member.findFirst({
            where: {
              name: captainName
            }
          }
      )
      return this.prismaService.team.findMany({
        where: {
          name: {contains:  name},
          captainId: captain.id
        }
      })
    }
    return this.prismaService.team.findMany({
      where: {
        name: {contains:  name},
      }
    })
  }

  async deleteTeam(where: Prisma.TeamWhereUniqueInput): Promise<Team> {
    const team = await this.prismaService.team.count({
      where: where
    })
    if (team == 0) {
      throw new NotFoundException('Team not found')
    }
    return this.prismaService.team.delete({
      where,
    });
  }
}

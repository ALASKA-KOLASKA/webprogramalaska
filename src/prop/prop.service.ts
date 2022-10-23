import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Prop } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PropService {
  constructor(private prismaService: PrismaService) {
  }

  async getProp(id: Prisma.PropWhereUniqueInput): Promise<Prop | null> {
    const prop = await this.prismaService.prop.count({
      where: id
    })
    if (prop == 0) {
      throw new NotFoundException('Prop not found')
    }
    return this.prismaService.prop.findUnique({
      where: id,
    })
  }

  async addProp(data: Prisma.PropCreateInput): Promise<Prop> {
    return this.prismaService.prop.create({
      data,
    })
  }

  async getProps(name: string, startPrice: number, endPrice: number): Promise<Prop[] | null> {
    return this.prismaService.prop.findMany({
      where: {
        name: {contains:  name},
        price: {
          gt: startPrice,
          lt: endPrice
        }
      }
    })
  }

  async deleteProp(where: Prisma.PropWhereUniqueInput): Promise<Prop> {
    const prop = await this.prismaService.prop.count({
      where: where
    })
    if (prop == 0) {
      throw new NotFoundException('Prop not found')
    }
    return this.prismaService.prop.delete({
      where,
    });
  }

}

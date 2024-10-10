import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MenusService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createMenuDto: any) {
    let depth = 0;

    if (createMenuDto.parentId) {
      const parentMenu = await this.prisma.menu.findUnique({
        where: { id: createMenuDto.parentId },
      });

      if (!parentMenu) {
        throw new NotFoundException('Parent menu not found');
      }

      depth = parentMenu.depth + 1;
    }

    return this.prisma.menu.create({
      data: {
        name: createMenuDto.name,
        parentId: createMenuDto.parentId || null,
        depth: depth,
      },
    });
  }

  findAll() {
    return this.prisma.menu.findMany({
      include: {
        parent: {
          select: {
            name: true,
            id: true,
            depth: true,
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.menu.findUnique({
      where: {
        id: id,
      },
      include: {
        parent: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: string) {
    return this.prisma.menu.delete({ where: { id } });
  }

  async getTree(id: string) {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
      include: {
        submenu: true,
      },
    });

    if (!menu) {
      throw new NotFoundException('Menu not found');
    }
    return this.buildNestedMenu(menu);
  }

  private async buildNestedMenu(menu: any): Promise<any> {
    const children = await Promise.all(
      menu.submenu.map(async (child: any) => {
        const nestedChild = await this.getTree(child.id);
        return {
          id: nestedChild.id,
          name: nestedChild.name,
          depth: nestedChild?.depth,
          children: nestedChild.children || [],
        };
      }),
    );

    return {
      id: menu.id,
      name: menu.name,
      children,
    };
  }

  getParents() {
    return this.prisma.menu.findMany({
      where: {
        parentId: null,
      },
    });
  }
}

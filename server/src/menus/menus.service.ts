import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';

@Injectable()
export class MenusService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createMenuDto: CreateMenuDto) {
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

  update(id: string, updateMenuDto: UpdateMenuDto) {
    console.log('🚀 ~ MenusService ~ update ~ updateMenuDto:', updateMenuDto);
    return this.prisma.menu.update({
      where: {
        id: id,
      },
      data: {
        ...updateMenuDto,
      },
    });
  }

  remove(id: string) {
    return this.prisma.menu.delete({ where: { id } });
  }

  async getTree(id: string) {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
      include: {
        submenu: {
          orderBy: {
            depth: 'asc',
          },
        },
        parent: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!menu) {
      throw new NotFoundException('Menu not found');
    }
    const nestedMenu = await this.buildNestedMenu(menu);

    return nestedMenu;
  }

  private async buildNestedMenu(menu: any): Promise<any> {
    const children = await Promise.all(
      menu.submenu.map(async (child: any) => {
        const nestedChild = await this.getTree(child.id);
        return {
          id: nestedChild.id,
          name: nestedChild.name,
          depth: nestedChild?.depth,
          parent: {
            id: nestedChild?.parent?.id,
            name: nestedChild?.parent?.name,
          },
          children: nestedChild.children || [],
        };
      }),
    );

    return {
      id: menu.id,
      name: menu.name,
      depth: menu?.depth,
      parent: {
        id: menu?.parent?.id,
        name: menu?.parent?.name,
      },
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

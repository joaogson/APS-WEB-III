import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CursoService {
  constructor(private prisma: PrismaService) {}

  async create(createCursoDto: CreateCursoDto) {
    return await this.prisma.curso.create({
      data: createCursoDto,
    });
  }

  async findAll() {
    return await this.prisma.curso.findMany({
      include: {
        matriculas: {
          include: {
            aluno: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const curso = await this.prisma.curso.findUnique({
      where: { id },
      include: {
        matriculas: {
          include: {
            aluno: true,
          },
        },
      },
    });

    if (!curso) {
      throw new NotFoundException(`Curso com ID ${id} não encontrado`);
    }

    return curso;
  }

  async update(id: number, updateCursoDto: UpdateCursoDto) {
    await this.findOne(id); // Verifica se existe

    return await this.prisma.curso.update({
      where: { id },
      data: updateCursoDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica se existe

    return await this.prisma.curso.delete({
      where: { id },
    });
  }
}

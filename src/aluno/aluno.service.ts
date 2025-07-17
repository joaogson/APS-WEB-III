import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlunoService {
  constructor(private prisma: PrismaService) {}

  async create(createAlunoDto: CreateAlunoDto) {
    return await this.prisma.aluno.create({
      data: createAlunoDto,
    });
  }

  async findAll() {
    return await this.prisma.aluno.findMany({
      include: {
        matriculas: {
          include: {
            curso: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const aluno = await this.prisma.aluno.findUnique({
      where: { id },
      include: {
        matriculas: {
          include: {
            curso: true,
          },
        },
      },
    });

    if (!aluno) {
      throw new NotFoundException(`Aluno com ID ${id} não encontrado`);
    }

    return aluno;
  }

  async update(id: number, updateAlunoDto: UpdateAlunoDto) {
    await this.findOne(id); // Verifica se existe

    return await this.prisma.aluno.update({
      where: { id },
      data: updateAlunoDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica se existe

    return await this.prisma.aluno.delete({
      where: { id },
    });
  }
}

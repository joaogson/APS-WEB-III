import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MatriculaService {
  constructor(private prisma: PrismaService) {}

  async create(createMatriculaDto: CreateMatriculaDto) {
    // Verificar se aluno e curso existem
    const aluno = await this.prisma.aluno.findUnique({
      where: { id: createMatriculaDto.alunoId }
    });
    
    if (!aluno) {
      throw new NotFoundException(`Aluno com ID ${createMatriculaDto.alunoId} não encontrado`);
    }

    const curso = await this.prisma.curso.findUnique({
      where: { id: createMatriculaDto.cursoId }
    });
    
    if (!curso) {
      throw new NotFoundException(`Curso com ID ${createMatriculaDto.cursoId} não encontrado`);
    }

    // Verificar se já existe matrícula ativa para este aluno e curso
    const matriculaExistente = await this.prisma.matricula.findFirst({
      where: {
        alunoId: createMatriculaDto.alunoId,
        cursoId: createMatriculaDto.cursoId,
        status: 'ATIVA'
      }
    });

    if (matriculaExistente) {
      throw new BadRequestException('Aluno já está matriculado neste curso');
    }

    return await this.prisma.matricula.create({
      data: createMatriculaDto,
      include: {
        aluno: true,
        curso: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.matricula.findMany({
      include: {
        aluno: true,
        curso: true,
      },
    });
  }

  async findOne(id: number) {
    const matricula = await this.prisma.matricula.findUnique({
      where: { id },
      include: {
        aluno: true,
        curso: true,
      },
    });

    if (!matricula) {
      throw new NotFoundException(`Matrícula com ID ${id} não encontrada`);
    }

    return matricula;
  }

  async update(id: number, updateMatriculaDto: UpdateMatriculaDto) {
    await this.findOne(id); // Verifica se existe

    return await this.prisma.matricula.update({
      where: { id },
      data: updateMatriculaDto,
      include: {
        aluno: true,
        curso: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Verifica se existe

    return await this.prisma.matricula.delete({
      where: { id },
    });
  }

  async findByAluno(alunoId: number) {
    return await this.prisma.matricula.findMany({
      where: { alunoId },
      include: {
        curso: true,
      },
    });
  }

  async findByCurso(cursoId: number) {
    return await this.prisma.matricula.findMany({
      where: { cursoId },
      include: {
        aluno: true,
      },
    });
  }
}

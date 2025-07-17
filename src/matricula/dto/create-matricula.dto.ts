import { IsNotEmpty, IsNumber, IsOptional, IsString, IsIn } from 'class-validator';

export class CreateMatriculaDto {
  @IsNotEmpty()
  @IsNumber()
  alunoId: number;

  @IsNotEmpty()
  @IsNumber()
  cursoId: number;

  @IsOptional()
  @IsString()
  @IsIn(['ATIVA', 'CANCELADA', 'CONCLUIDA'])
  status?: string = 'ATIVA';
}

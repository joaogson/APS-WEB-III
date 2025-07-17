import { IsNotEmpty, IsString, IsOptional, IsNumber, Min } from 'class-validator';

export class CreateCursoDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  cargaHoraria: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  preco: number;
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlunoModule } from './aluno/aluno.module';
import { CursoModule } from './curso/curso.module';
import { MatriculaModule } from './matricula/matricula.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [AlunoModule, CursoModule, MatriculaModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

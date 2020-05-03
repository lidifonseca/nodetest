import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcoesRespostasController } from '../web/rest/acoes-respostas.controller';
import { AcoesRespostasRepository } from '../repository/acoes-respostas.repository';
import { AcoesRespostasService } from '../service/acoes-respostas.service';

@Module({
  imports: [TypeOrmModule.forFeature([AcoesRespostasRepository])],
  controllers: [AcoesRespostasController],
  providers: [AcoesRespostasService],
  exports: [AcoesRespostasService]
})
export class AcoesRespostasModule {}

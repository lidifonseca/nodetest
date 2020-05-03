import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcaoController } from '../web/rest/acao.controller';
import { AcaoRepository } from '../repository/acao.repository';
import { AcaoService } from '../service/acao.service';

@Module({
  imports: [TypeOrmModule.forFeature([AcaoRepository])],
  controllers: [AcaoController],
  providers: [AcaoService],
  exports: [AcaoService]
})
export class AcaoModule {}

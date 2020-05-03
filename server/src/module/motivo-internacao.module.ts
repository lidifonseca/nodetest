import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MotivoInternacaoController } from '../web/rest/motivo-internacao.controller';
import { MotivoInternacaoRepository } from '../repository/motivo-internacao.repository';
import { MotivoInternacaoService } from '../service/motivo-internacao.service';

@Module({
  imports: [TypeOrmModule.forFeature([MotivoInternacaoRepository])],
  controllers: [MotivoInternacaoController],
  providers: [MotivoInternacaoService],
  exports: [MotivoInternacaoService]
})
export class MotivoInternacaoModule {}

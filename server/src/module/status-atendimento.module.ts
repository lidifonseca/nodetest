import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusAtendimentoController } from '../web/rest/status-atendimento.controller';
import { StatusAtendimentoRepository } from '../repository/status-atendimento.repository';
import { StatusAtendimentoService } from '../service/status-atendimento.service';

@Module({
  imports: [TypeOrmModule.forFeature([StatusAtendimentoRepository])],
  controllers: [StatusAtendimentoController],
  providers: [StatusAtendimentoService],
  exports: [StatusAtendimentoService]
})
export class StatusAtendimentoModule {}

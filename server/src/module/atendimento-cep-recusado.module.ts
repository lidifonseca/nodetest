import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtendimentoCepRecusadoController } from '../web/rest/atendimento-cep-recusado.controller';
import { AtendimentoCepRecusadoRepository } from '../repository/atendimento-cep-recusado.repository';
import { AtendimentoCepRecusadoService } from '../service/atendimento-cep-recusado.service';

@Module({
  imports: [TypeOrmModule.forFeature([AtendimentoCepRecusadoRepository])],
  controllers: [AtendimentoCepRecusadoController],
  providers: [AtendimentoCepRecusadoService],
  exports: [AtendimentoCepRecusadoService]
})
export class AtendimentoCepRecusadoModule {}

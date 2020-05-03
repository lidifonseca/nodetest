import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtendimentoSorteioFeitoController } from '../web/rest/atendimento-sorteio-feito.controller';
import { AtendimentoSorteioFeitoRepository } from '../repository/atendimento-sorteio-feito.repository';
import { AtendimentoSorteioFeitoService } from '../service/atendimento-sorteio-feito.service';

@Module({
  imports: [TypeOrmModule.forFeature([AtendimentoSorteioFeitoRepository])],
  controllers: [AtendimentoSorteioFeitoController],
  providers: [AtendimentoSorteioFeitoService],
  exports: [AtendimentoSorteioFeitoService]
})
export class AtendimentoSorteioFeitoModule {}

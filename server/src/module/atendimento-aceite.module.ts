import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtendimentoAceiteController } from '../web/rest/atendimento-aceite.controller';
import { AtendimentoAceiteRepository } from '../repository/atendimento-aceite.repository';
import { AtendimentoAceiteService } from '../service/atendimento-aceite.service';

@Module({
  imports: [TypeOrmModule.forFeature([AtendimentoAceiteRepository])],
  controllers: [AtendimentoAceiteController],
  providers: [AtendimentoAceiteService],
  exports: [AtendimentoAceiteService]
})
export class AtendimentoAceiteModule {}

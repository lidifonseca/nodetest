import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtendimentoAcompanhamentoPushController } from '../web/rest/atendimento-acompanhamento-push.controller';
import { AtendimentoAcompanhamentoPushRepository } from '../repository/atendimento-acompanhamento-push.repository';
import { AtendimentoAcompanhamentoPushService } from '../service/atendimento-acompanhamento-push.service';

@Module({
  imports: [TypeOrmModule.forFeature([AtendimentoAcompanhamentoPushRepository])],
  controllers: [AtendimentoAcompanhamentoPushController],
  providers: [AtendimentoAcompanhamentoPushService],
  exports: [AtendimentoAcompanhamentoPushService]
})
export class AtendimentoAcompanhamentoPushModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AtendimentoAtividadesController } from '../web/rest/atendimento-atividades.controller';
import { AtendimentoAtividadesRepository } from '../repository/atendimento-atividades.repository';
import { AtendimentoAtividadesService } from '../service/atendimento-atividades.service';

@Module({
  imports: [TypeOrmModule.forFeature([AtendimentoAtividadesRepository])],
  controllers: [AtendimentoAtividadesController],
  providers: [AtendimentoAtividadesService],
  exports: [AtendimentoAtividadesService]
})
export class AtendimentoAtividadesModule {}

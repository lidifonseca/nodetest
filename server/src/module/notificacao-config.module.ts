import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificacaoConfigController } from '../web/rest/notificacao-config.controller';
import { NotificacaoConfigRepository } from '../repository/notificacao-config.repository';
import { NotificacaoConfigService } from '../service/notificacao-config.service';

@Module({
  imports: [TypeOrmModule.forFeature([NotificacaoConfigRepository])],
  controllers: [NotificacaoConfigController],
  providers: [NotificacaoConfigService],
  exports: [NotificacaoConfigService]
})
export class NotificacaoConfigModule {}

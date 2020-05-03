import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificacaoConfigUsuarioController } from '../web/rest/notificacao-config-usuario.controller';
import { NotificacaoConfigUsuarioRepository } from '../repository/notificacao-config-usuario.repository';
import { NotificacaoConfigUsuarioService } from '../service/notificacao-config-usuario.service';

@Module({
  imports: [TypeOrmModule.forFeature([NotificacaoConfigUsuarioRepository])],
  controllers: [NotificacaoConfigUsuarioController],
  providers: [NotificacaoConfigUsuarioService],
  exports: [NotificacaoConfigUsuarioService]
})
export class NotificacaoConfigUsuarioModule {}

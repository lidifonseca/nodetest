import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioAcaoController } from '../web/rest/usuario-acao.controller';
import { UsuarioAcaoRepository } from '../repository/usuario-acao.repository';
import { UsuarioAcaoService } from '../service/usuario-acao.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioAcaoRepository])],
  controllers: [UsuarioAcaoController],
  providers: [UsuarioAcaoService],
  exports: [UsuarioAcaoService]
})
export class UsuarioAcaoModule {}

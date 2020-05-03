import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioPainelGerencialController } from '../web/rest/usuario-painel-gerencial.controller';
import { UsuarioPainelGerencialRepository } from '../repository/usuario-painel-gerencial.repository';
import { UsuarioPainelGerencialService } from '../service/usuario-painel-gerencial.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioPainelGerencialRepository])],
  controllers: [UsuarioPainelGerencialController],
  providers: [UsuarioPainelGerencialService],
  exports: [UsuarioPainelGerencialService]
})
export class UsuarioPainelGerencialModule {}

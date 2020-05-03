import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioStatusAtualController } from '../web/rest/usuario-status-atual.controller';
import { UsuarioStatusAtualRepository } from '../repository/usuario-status-atual.repository';
import { UsuarioStatusAtualService } from '../service/usuario-status-atual.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioStatusAtualRepository])],
  controllers: [UsuarioStatusAtualController],
  providers: [UsuarioStatusAtualService],
  exports: [UsuarioStatusAtualService]
})
export class UsuarioStatusAtualModule {}

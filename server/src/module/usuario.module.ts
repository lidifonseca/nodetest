import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from '../web/rest/usuario.controller';
import { UsuarioRepository } from '../repository/usuario.repository';
import { UsuarioService } from '../service/usuario.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioRepository])],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService]
})
export class UsuarioModule {}

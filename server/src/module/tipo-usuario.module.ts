import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoUsuarioController } from '../web/rest/tipo-usuario.controller';
import { TipoUsuarioRepository } from '../repository/tipo-usuario.repository';
import { TipoUsuarioService } from '../service/tipo-usuario.service';

@Module({
  imports: [TypeOrmModule.forFeature([TipoUsuarioRepository])],
  controllers: [TipoUsuarioController],
  providers: [TipoUsuarioService],
  exports: [TipoUsuarioService]
})
export class TipoUsuarioModule {}

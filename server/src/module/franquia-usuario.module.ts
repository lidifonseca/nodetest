import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FranquiaUsuarioController } from '../web/rest/franquia-usuario.controller';
import { FranquiaUsuarioRepository } from '../repository/franquia-usuario.repository';
import { FranquiaUsuarioService } from '../service/franquia-usuario.service';

@Module({
  imports: [TypeOrmModule.forFeature([FranquiaUsuarioRepository])],
  controllers: [FranquiaUsuarioController],
  providers: [FranquiaUsuarioService],
  exports: [FranquiaUsuarioService]
})
export class FranquiaUsuarioModule {}

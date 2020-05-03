import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenUsuarioController } from '../web/rest/token-usuario.controller';
import { TokenUsuarioRepository } from '../repository/token-usuario.repository';
import { TokenUsuarioService } from '../service/token-usuario.service';

@Module({
  imports: [TypeOrmModule.forFeature([TokenUsuarioRepository])],
  controllers: [TokenUsuarioController],
  providers: [TokenUsuarioService],
  exports: [TokenUsuarioService]
})
export class TokenUsuarioModule {}

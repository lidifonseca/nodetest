import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioPanicoController } from '../web/rest/usuario-panico.controller';
import { UsuarioPanicoRepository } from '../repository/usuario-panico.repository';
import { UsuarioPanicoService } from '../service/usuario-panico.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioPanicoRepository])],
  controllers: [UsuarioPanicoController],
  providers: [UsuarioPanicoService],
  exports: [UsuarioPanicoService]
})
export class UsuarioPanicoModule {}

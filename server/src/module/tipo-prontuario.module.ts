import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoProntuarioController } from '../web/rest/tipo-prontuario.controller';
import { TipoProntuarioRepository } from '../repository/tipo-prontuario.repository';
import { TipoProntuarioService } from '../service/tipo-prontuario.service';

@Module({
  imports: [TypeOrmModule.forFeature([TipoProntuarioRepository])],
  controllers: [TipoProntuarioController],
  providers: [TipoProntuarioService],
  exports: [TipoProntuarioService]
})
export class TipoProntuarioModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EspecialidadeOperadoraController } from '../web/rest/especialidade-operadora.controller';
import { EspecialidadeOperadoraRepository } from '../repository/especialidade-operadora.repository';
import { EspecialidadeOperadoraService } from '../service/especialidade-operadora.service';

@Module({
  imports: [TypeOrmModule.forFeature([EspecialidadeOperadoraRepository])],
  controllers: [EspecialidadeOperadoraController],
  providers: [EspecialidadeOperadoraService],
  exports: [EspecialidadeOperadoraService]
})
export class EspecialidadeOperadoraModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EspecialidadeUnidadeController } from '../web/rest/especialidade-unidade.controller';
import { EspecialidadeUnidadeRepository } from '../repository/especialidade-unidade.repository';
import { EspecialidadeUnidadeService } from '../service/especialidade-unidade.service';

@Module({
  imports: [TypeOrmModule.forFeature([EspecialidadeUnidadeRepository])],
  controllers: [EspecialidadeUnidadeController],
  providers: [EspecialidadeUnidadeService],
  exports: [EspecialidadeUnidadeService]
})
export class EspecialidadeUnidadeModule {}

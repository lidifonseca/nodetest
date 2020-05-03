import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoEspecialidadeController } from '../web/rest/tipo-especialidade.controller';
import { TipoEspecialidadeRepository } from '../repository/tipo-especialidade.repository';
import { TipoEspecialidadeService } from '../service/tipo-especialidade.service';

@Module({
  imports: [TypeOrmModule.forFeature([TipoEspecialidadeRepository])],
  controllers: [TipoEspecialidadeController],
  providers: [TipoEspecialidadeService],
  exports: [TipoEspecialidadeService]
})
export class TipoEspecialidadeModule {}

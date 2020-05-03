import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EspecialidadeController } from '../web/rest/especialidade.controller';
import { EspecialidadeRepository } from '../repository/especialidade.repository';
import { EspecialidadeService } from '../service/especialidade.service';

@Module({
  imports: [TypeOrmModule.forFeature([EspecialidadeRepository])],
  controllers: [EspecialidadeController],
  providers: [EspecialidadeService],
  exports: [EspecialidadeService]
})
export class EspecialidadeModule {}

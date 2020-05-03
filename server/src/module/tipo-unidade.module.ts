import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoUnidadeController } from '../web/rest/tipo-unidade.controller';
import { TipoUnidadeRepository } from '../repository/tipo-unidade.repository';
import { TipoUnidadeService } from '../service/tipo-unidade.service';

@Module({
  imports: [TypeOrmModule.forFeature([TipoUnidadeRepository])],
  controllers: [TipoUnidadeController],
  providers: [TipoUnidadeService],
  exports: [TipoUnidadeService]
})
export class TipoUnidadeModule {}

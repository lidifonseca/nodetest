import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaUnidadeController } from '../web/rest/categoria-unidade.controller';
import { CategoriaUnidadeRepository } from '../repository/categoria-unidade.repository';
import { CategoriaUnidadeService } from '../service/categoria-unidade.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaUnidadeRepository])],
  controllers: [CategoriaUnidadeController],
  providers: [CategoriaUnidadeService],
  exports: [CategoriaUnidadeService]
})
export class CategoriaUnidadeModule {}

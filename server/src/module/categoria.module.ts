import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaController } from '../web/rest/categoria.controller';
import { CategoriaRepository } from '../repository/categoria.repository';
import { CategoriaService } from '../service/categoria.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaRepository])],
  controllers: [CategoriaController],
  providers: [CategoriaService],
  exports: [CategoriaService]
})
export class CategoriaModule {}

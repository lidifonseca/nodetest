import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaAtividadeController } from '../web/rest/categoria-atividade.controller';
import { CategoriaAtividadeRepository } from '../repository/categoria-atividade.repository';
import { CategoriaAtividadeService } from '../service/categoria-atividade.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaAtividadeRepository])],
  controllers: [CategoriaAtividadeController],
  providers: [CategoriaAtividadeService],
  exports: [CategoriaAtividadeService]
})
export class CategoriaAtividadeModule {}

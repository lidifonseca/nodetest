import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RespostasController } from '../web/rest/respostas.controller';
import { RespostasRepository } from '../repository/respostas.repository';
import { RespostasService } from '../service/respostas.service';

@Module({
  imports: [TypeOrmModule.forFeature([RespostasRepository])],
  controllers: [RespostasController],
  providers: [RespostasService],
  exports: [RespostasService]
})
export class RespostasModule {}

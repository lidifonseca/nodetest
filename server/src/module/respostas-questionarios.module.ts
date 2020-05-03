import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RespostasQuestionariosController } from '../web/rest/respostas-questionarios.controller';
import { RespostasQuestionariosRepository } from '../repository/respostas-questionarios.repository';
import { RespostasQuestionariosService } from '../service/respostas-questionarios.service';

@Module({
  imports: [TypeOrmModule.forFeature([RespostasQuestionariosRepository])],
  controllers: [RespostasQuestionariosController],
  providers: [RespostasQuestionariosService],
  exports: [RespostasQuestionariosService]
})
export class RespostasQuestionariosModule {}

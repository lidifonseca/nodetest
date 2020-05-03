import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerguntasQuestionarioController } from '../web/rest/perguntas-questionario.controller';
import { PerguntasQuestionarioRepository } from '../repository/perguntas-questionario.repository';
import { PerguntasQuestionarioService } from '../service/perguntas-questionario.service';

@Module({
  imports: [TypeOrmModule.forFeature([PerguntasQuestionarioRepository])],
  controllers: [PerguntasQuestionarioController],
  providers: [PerguntasQuestionarioService],
  exports: [PerguntasQuestionarioService]
})
export class PerguntasQuestionarioModule {}

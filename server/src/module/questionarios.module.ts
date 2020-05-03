import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionariosController } from '../web/rest/questionarios.controller';
import { QuestionariosRepository } from '../repository/questionarios.repository';
import { QuestionariosService } from '../service/questionarios.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionariosRepository])],
  controllers: [QuestionariosController],
  providers: [QuestionariosService],
  exports: [QuestionariosService]
})
export class QuestionariosModule {}

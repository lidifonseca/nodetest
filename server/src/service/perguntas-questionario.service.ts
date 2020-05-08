import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import PerguntasQuestionario from '../domain/perguntas-questionario.entity';
import { PerguntasQuestionarioRepository } from '../repository/perguntas-questionario.repository';

const relationshipNames = [];
relationshipNames.push('segmentosPerguntas');

@Injectable()
export class PerguntasQuestionarioService {
  logger = new Logger('PerguntasQuestionarioService');

  constructor(
    @InjectRepository(PerguntasQuestionarioRepository) private perguntasQuestionarioRepository: PerguntasQuestionarioRepository
  ) {}

  async findById(id: string): Promise<PerguntasQuestionario | undefined> {
    const options = { relations: relationshipNames };
    return await this.perguntasQuestionarioRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PerguntasQuestionario>): Promise<PerguntasQuestionario | undefined> {
    return await this.perguntasQuestionarioRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<PerguntasQuestionario>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[PerguntasQuestionario[], number]> {
    options.relations = relationshipNames;
    let where = {};
    for (const i in filters) {
      if (filters.hasOwnProperty(i)) {
        const element = filters[i];
        if (element['operation'] === 'contains') {
          where[element['column']] = Like('%' + element['value'] + '%');
        } else if (element['operation'] === 'equals') {
          where[element['column']] = Equal(element['value']);
        }
      }
    }
    options.where = where;
    return await this.perguntasQuestionarioRepository.findAndCount(options);
  }

  async save(perguntasQuestionario: PerguntasQuestionario): Promise<PerguntasQuestionario | undefined> {
    return await this.perguntasQuestionarioRepository.save(perguntasQuestionario);
  }

  async update(perguntasQuestionario: PerguntasQuestionario): Promise<PerguntasQuestionario | undefined> {
    return await this.save(perguntasQuestionario);
  }

  async delete(perguntasQuestionario: PerguntasQuestionario): Promise<PerguntasQuestionario | undefined> {
    return await this.perguntasQuestionarioRepository.remove(perguntasQuestionario);
  }
}

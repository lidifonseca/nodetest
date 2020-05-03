import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import PerguntasQuestionario from '../domain/perguntas-questionario.entity';
import { PerguntasQuestionarioRepository } from '../repository/perguntas-questionario.repository';

const relationshipNames = [];
relationshipNames.push('segmentosPerguntasId');

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
    let where = '';
    let first = true;
    for (const i in filters) {
      if (filters.hasOwnProperty(i)) {
        const element = filters[i];
        if (!first) {
          where += 'and';
        } else {
          first = false;
        }
        if (element['operation'] === 'contains') {
          where += ' `PerguntasQuestionario`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `PerguntasQuestionario`.`' + element['column'] + '` = "' + element['value'] + '" ';
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

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Questionarios from '../domain/questionarios.entity';
import { QuestionariosRepository } from '../repository/questionarios.repository';

const relationshipNames = [];
relationshipNames.push('pacienteId');

@Injectable()
export class QuestionariosService {
  logger = new Logger('QuestionariosService');

  constructor(@InjectRepository(QuestionariosRepository) private questionariosRepository: QuestionariosRepository) {}

  async findById(id: string): Promise<Questionarios | undefined> {
    const options = { relations: relationshipNames };
    return await this.questionariosRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Questionarios>): Promise<Questionarios | undefined> {
    return await this.questionariosRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<Questionarios>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[Questionarios[], number]> {
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
          where += ' `Questionarios`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `Questionarios`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.questionariosRepository.findAndCount(options);
  }

  async save(questionarios: Questionarios): Promise<Questionarios | undefined> {
    return await this.questionariosRepository.save(questionarios);
  }

  async update(questionarios: Questionarios): Promise<Questionarios | undefined> {
    return await this.save(questionarios);
  }

  async delete(questionarios: Questionarios): Promise<Questionarios | undefined> {
    return await this.questionariosRepository.remove(questionarios);
  }
}

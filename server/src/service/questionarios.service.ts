import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import Questionarios from '../domain/questionarios.entity';
import { QuestionariosRepository } from '../repository/questionarios.repository';

const relationshipNames = [];
relationshipNames.push('paciente');

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

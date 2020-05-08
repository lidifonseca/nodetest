import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import RespostasQuestionarios from '../domain/respostas-questionarios.entity';
import { RespostasQuestionariosRepository } from '../repository/respostas-questionarios.repository';

const relationshipNames = [];
relationshipNames.push('questionarios');

@Injectable()
export class RespostasQuestionariosService {
  logger = new Logger('RespostasQuestionariosService');

  constructor(
    @InjectRepository(RespostasQuestionariosRepository) private respostasQuestionariosRepository: RespostasQuestionariosRepository
  ) {}

  async findById(id: string): Promise<RespostasQuestionarios | undefined> {
    const options = { relations: relationshipNames };
    return await this.respostasQuestionariosRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<RespostasQuestionarios>): Promise<RespostasQuestionarios | undefined> {
    return await this.respostasQuestionariosRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<RespostasQuestionarios>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[RespostasQuestionarios[], number]> {
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
    return await this.respostasQuestionariosRepository.findAndCount(options);
  }

  async save(respostasQuestionarios: RespostasQuestionarios): Promise<RespostasQuestionarios | undefined> {
    return await this.respostasQuestionariosRepository.save(respostasQuestionarios);
  }

  async update(respostasQuestionarios: RespostasQuestionarios): Promise<RespostasQuestionarios | undefined> {
    return await this.save(respostasQuestionarios);
  }

  async delete(respostasQuestionarios: RespostasQuestionarios): Promise<RespostasQuestionarios | undefined> {
    return await this.respostasQuestionariosRepository.remove(respostasQuestionarios);
  }
}

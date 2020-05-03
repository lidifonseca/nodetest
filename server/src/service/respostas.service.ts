import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Respostas from '../domain/respostas.entity';
import { RespostasRepository } from '../repository/respostas.repository';

const relationshipNames = [];
relationshipNames.push('perguntasQuestionarioId');

@Injectable()
export class RespostasService {
  logger = new Logger('RespostasService');

  constructor(@InjectRepository(RespostasRepository) private respostasRepository: RespostasRepository) {}

  async findById(id: string): Promise<Respostas | undefined> {
    const options = { relations: relationshipNames };
    return await this.respostasRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Respostas>): Promise<Respostas | undefined> {
    return await this.respostasRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<Respostas>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[Respostas[], number]> {
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
          where += ' `Respostas`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `Respostas`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.respostasRepository.findAndCount(options);
  }

  async save(respostas: Respostas): Promise<Respostas | undefined> {
    return await this.respostasRepository.save(respostas);
  }

  async update(respostas: Respostas): Promise<Respostas | undefined> {
    return await this.save(respostas);
  }

  async delete(respostas: Respostas): Promise<Respostas | undefined> {
    return await this.respostasRepository.remove(respostas);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import TermosUso from '../domain/termos-uso.entity';
import { TermosUsoRepository } from '../repository/termos-uso.repository';

const relationshipNames = [];

@Injectable()
export class TermosUsoService {
  logger = new Logger('TermosUsoService');

  constructor(@InjectRepository(TermosUsoRepository) private termosUsoRepository: TermosUsoRepository) {}

  async findById(id: string): Promise<TermosUso | undefined> {
    const options = { relations: relationshipNames };
    return await this.termosUsoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<TermosUso>): Promise<TermosUso | undefined> {
    return await this.termosUsoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<TermosUso>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[TermosUso[], number]> {
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
    return await this.termosUsoRepository.findAndCount(options);
  }

  async save(termosUso: TermosUso): Promise<TermosUso | undefined> {
    return await this.termosUsoRepository.save(termosUso);
  }

  async update(termosUso: TermosUso): Promise<TermosUso | undefined> {
    return await this.save(termosUso);
  }

  async delete(termosUso: TermosUso): Promise<TermosUso | undefined> {
    return await this.termosUsoRepository.remove(termosUso);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Profissional from '../domain/profissional.entity';
import { ProfissionalRepository } from '../repository/profissional.repository';

const relationshipNames = [];

@Injectable()
export class ProfissionalService {
  logger = new Logger('ProfissionalService');

  constructor(@InjectRepository(ProfissionalRepository) private profissionalRepository: ProfissionalRepository) {}

  async findById(id: string): Promise<Profissional | undefined> {
    const options = { relations: relationshipNames };
    return await this.profissionalRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Profissional>): Promise<Profissional | undefined> {
    return await this.profissionalRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<Profissional>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[Profissional[], number]> {
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
          where += ' `Profissional`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `Profissional`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.profissionalRepository.findAndCount(options);
  }

  async save(profissional: Profissional): Promise<Profissional | undefined> {
    return await this.profissionalRepository.save(profissional);
  }

  async update(profissional: Profissional): Promise<Profissional | undefined> {
    return await this.save(profissional);
  }

  async delete(profissional: Profissional): Promise<Profissional | undefined> {
    return await this.profissionalRepository.remove(profissional);
  }
}

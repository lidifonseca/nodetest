import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import ProfissionalFranquia from '../domain/profissional-franquia.entity';
import { ProfissionalFranquiaRepository } from '../repository/profissional-franquia.repository';

const relationshipNames = [];

@Injectable()
export class ProfissionalFranquiaService {
  logger = new Logger('ProfissionalFranquiaService');

  constructor(@InjectRepository(ProfissionalFranquiaRepository) private profissionalFranquiaRepository: ProfissionalFranquiaRepository) {}

  async findById(id: string): Promise<ProfissionalFranquia | undefined> {
    const options = { relations: relationshipNames };
    return await this.profissionalFranquiaRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<ProfissionalFranquia>): Promise<ProfissionalFranquia | undefined> {
    return await this.profissionalFranquiaRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<ProfissionalFranquia>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[ProfissionalFranquia[], number]> {
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
          where += ' `ProfissionalFranquia`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `ProfissionalFranquia`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.profissionalFranquiaRepository.findAndCount(options);
  }

  async save(profissionalFranquia: ProfissionalFranquia): Promise<ProfissionalFranquia | undefined> {
    return await this.profissionalFranquiaRepository.save(profissionalFranquia);
  }

  async update(profissionalFranquia: ProfissionalFranquia): Promise<ProfissionalFranquia | undefined> {
    return await this.save(profissionalFranquia);
  }

  async delete(profissionalFranquia: ProfissionalFranquia): Promise<ProfissionalFranquia | undefined> {
    return await this.profissionalFranquiaRepository.remove(profissionalFranquia);
  }
}

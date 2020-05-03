import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import TipoOperadora from '../domain/tipo-operadora.entity';
import { TipoOperadoraRepository } from '../repository/tipo-operadora.repository';

const relationshipNames = [];

@Injectable()
export class TipoOperadoraService {
  logger = new Logger('TipoOperadoraService');

  constructor(@InjectRepository(TipoOperadoraRepository) private tipoOperadoraRepository: TipoOperadoraRepository) {}

  async findById(id: string): Promise<TipoOperadora | undefined> {
    const options = { relations: relationshipNames };
    return await this.tipoOperadoraRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<TipoOperadora>): Promise<TipoOperadora | undefined> {
    return await this.tipoOperadoraRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<TipoOperadora>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[TipoOperadora[], number]> {
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
          where += ' `TipoOperadora`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `TipoOperadora`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.tipoOperadoraRepository.findAndCount(options);
  }

  async save(tipoOperadora: TipoOperadora): Promise<TipoOperadora | undefined> {
    return await this.tipoOperadoraRepository.save(tipoOperadora);
  }

  async update(tipoOperadora: TipoOperadora): Promise<TipoOperadora | undefined> {
    return await this.save(tipoOperadora);
  }

  async delete(tipoOperadora: TipoOperadora): Promise<TipoOperadora | undefined> {
    return await this.tipoOperadoraRepository.remove(tipoOperadora);
  }
}

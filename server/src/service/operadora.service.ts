import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Operadora from '../domain/operadora.entity';
import { OperadoraRepository } from '../repository/operadora.repository';

const relationshipNames = [];

@Injectable()
export class OperadoraService {
  logger = new Logger('OperadoraService');

  constructor(@InjectRepository(OperadoraRepository) private operadoraRepository: OperadoraRepository) {}

  async findById(id: string): Promise<Operadora | undefined> {
    const options = { relations: relationshipNames };
    return await this.operadoraRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Operadora>): Promise<Operadora | undefined> {
    return await this.operadoraRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<Operadora>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[Operadora[], number]> {
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
          where += ' `Operadora`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `Operadora`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.operadoraRepository.findAndCount(options);
  }

  async save(operadora: Operadora): Promise<Operadora | undefined> {
    return await this.operadoraRepository.save(operadora);
  }

  async update(operadora: Operadora): Promise<Operadora | undefined> {
    return await this.save(operadora);
  }

  async delete(operadora: Operadora): Promise<Operadora | undefined> {
    return await this.operadoraRepository.remove(operadora);
  }
}

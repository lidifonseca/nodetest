import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Banco from '../domain/banco.entity';
import { BancoRepository } from '../repository/banco.repository';

const relationshipNames = [];

@Injectable()
export class BancoService {
  logger = new Logger('BancoService');

  constructor(@InjectRepository(BancoRepository) private bancoRepository: BancoRepository) {}

  async findById(id: string): Promise<Banco | undefined> {
    const options = { relations: relationshipNames };
    return await this.bancoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Banco>): Promise<Banco | undefined> {
    return await this.bancoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<Banco>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[Banco[], number]> {
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
          where += ' `Banco`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `Banco`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.bancoRepository.findAndCount(options);
  }

  async save(banco: Banco): Promise<Banco | undefined> {
    return await this.bancoRepository.save(banco);
  }

  async update(banco: Banco): Promise<Banco | undefined> {
    return await this.save(banco);
  }

  async delete(banco: Banco): Promise<Banco | undefined> {
    return await this.bancoRepository.remove(banco);
  }
}

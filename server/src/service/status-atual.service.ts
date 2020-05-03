import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import StatusAtual from '../domain/status-atual.entity';
import { StatusAtualRepository } from '../repository/status-atual.repository';

const relationshipNames = [];

@Injectable()
export class StatusAtualService {
  logger = new Logger('StatusAtualService');

  constructor(@InjectRepository(StatusAtualRepository) private statusAtualRepository: StatusAtualRepository) {}

  async findById(id: string): Promise<StatusAtual | undefined> {
    const options = { relations: relationshipNames };
    return await this.statusAtualRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<StatusAtual>): Promise<StatusAtual | undefined> {
    return await this.statusAtualRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<StatusAtual>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[StatusAtual[], number]> {
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
          where += ' `StatusAtual`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `StatusAtual`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.statusAtualRepository.findAndCount(options);
  }

  async save(statusAtual: StatusAtual): Promise<StatusAtual | undefined> {
    return await this.statusAtualRepository.save(statusAtual);
  }

  async update(statusAtual: StatusAtual): Promise<StatusAtual | undefined> {
    return await this.save(statusAtual);
  }

  async delete(statusAtual: StatusAtual): Promise<StatusAtual | undefined> {
    return await this.statusAtualRepository.remove(statusAtual);
  }
}

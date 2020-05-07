import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import StatusFinanceiro from '../domain/status-financeiro.entity';
import { StatusFinanceiroRepository } from '../repository/status-financeiro.repository';

const relationshipNames = [];

@Injectable()
export class StatusFinanceiroService {
  logger = new Logger('StatusFinanceiroService');

  constructor(@InjectRepository(StatusFinanceiroRepository) private statusFinanceiroRepository: StatusFinanceiroRepository) {}

  async findById(id: string): Promise<StatusFinanceiro | undefined> {
    const options = { relations: relationshipNames };
    return await this.statusFinanceiroRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<StatusFinanceiro>): Promise<StatusFinanceiro | undefined> {
    return await this.statusFinanceiroRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<StatusFinanceiro>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[StatusFinanceiro[], number]> {
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
    return await this.statusFinanceiroRepository.findAndCount(options);
  }

  async save(statusFinanceiro: StatusFinanceiro): Promise<StatusFinanceiro | undefined> {
    return await this.statusFinanceiroRepository.save(statusFinanceiro);
  }

  async update(statusFinanceiro: StatusFinanceiro): Promise<StatusFinanceiro | undefined> {
    return await this.save(statusFinanceiro);
  }

  async delete(statusFinanceiro: StatusFinanceiro): Promise<StatusFinanceiro | undefined> {
    return await this.statusFinanceiroRepository.remove(statusFinanceiro);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import AtendimentoStatusFinanceiro from '../domain/atendimento-status-financeiro.entity';
import { AtendimentoStatusFinanceiroRepository } from '../repository/atendimento-status-financeiro.repository';

const relationshipNames = [];

@Injectable()
export class AtendimentoStatusFinanceiroService {
  logger = new Logger('AtendimentoStatusFinanceiroService');

  constructor(
    @InjectRepository(AtendimentoStatusFinanceiroRepository)
    private atendimentoStatusFinanceiroRepository: AtendimentoStatusFinanceiroRepository
  ) {}

  async findById(id: string): Promise<AtendimentoStatusFinanceiro | undefined> {
    const options = { relations: relationshipNames };
    return await this.atendimentoStatusFinanceiroRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<AtendimentoStatusFinanceiro>): Promise<AtendimentoStatusFinanceiro | undefined> {
    return await this.atendimentoStatusFinanceiroRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<AtendimentoStatusFinanceiro>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[AtendimentoStatusFinanceiro[], number]> {
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
          where += ' `AtendimentoStatusFinanceiro`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `AtendimentoStatusFinanceiro`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.atendimentoStatusFinanceiroRepository.findAndCount(options);
  }

  async save(atendimentoStatusFinanceiro: AtendimentoStatusFinanceiro): Promise<AtendimentoStatusFinanceiro | undefined> {
    return await this.atendimentoStatusFinanceiroRepository.save(atendimentoStatusFinanceiro);
  }

  async update(atendimentoStatusFinanceiro: AtendimentoStatusFinanceiro): Promise<AtendimentoStatusFinanceiro | undefined> {
    return await this.save(atendimentoStatusFinanceiro);
  }

  async delete(atendimentoStatusFinanceiro: AtendimentoStatusFinanceiro): Promise<AtendimentoStatusFinanceiro | undefined> {
    return await this.atendimentoStatusFinanceiroRepository.remove(atendimentoStatusFinanceiro);
  }
}

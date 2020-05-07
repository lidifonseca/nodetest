import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
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

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import AtendimentoAtividades from '../domain/atendimento-atividades.entity';
import { AtendimentoAtividadesRepository } from '../repository/atendimento-atividades.repository';

const relationshipNames = [];
relationshipNames.push('idAtividade');
relationshipNames.push('idAtendimento');

@Injectable()
export class AtendimentoAtividadesService {
  logger = new Logger('AtendimentoAtividadesService');

  constructor(
    @InjectRepository(AtendimentoAtividadesRepository) private atendimentoAtividadesRepository: AtendimentoAtividadesRepository
  ) {}

  async findById(id: string): Promise<AtendimentoAtividades | undefined> {
    const options = { relations: relationshipNames };
    return await this.atendimentoAtividadesRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<AtendimentoAtividades>): Promise<AtendimentoAtividades | undefined> {
    return await this.atendimentoAtividadesRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<AtendimentoAtividades>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[AtendimentoAtividades[], number]> {
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
          where += ' `AtendimentoAtividades`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `AtendimentoAtividades`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.atendimentoAtividadesRepository.findAndCount(options);
  }

  async save(atendimentoAtividades: AtendimentoAtividades): Promise<AtendimentoAtividades | undefined> {
    return await this.atendimentoAtividadesRepository.save(atendimentoAtividades);
  }

  async update(atendimentoAtividades: AtendimentoAtividades): Promise<AtendimentoAtividades | undefined> {
    return await this.save(atendimentoAtividades);
  }

  async delete(atendimentoAtividades: AtendimentoAtividades): Promise<AtendimentoAtividades | undefined> {
    return await this.atendimentoAtividadesRepository.remove(atendimentoAtividades);
  }
}

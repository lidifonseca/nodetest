import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import AtendimentoAceite from '../domain/atendimento-aceite.entity';
import { AtendimentoAceiteRepository } from '../repository/atendimento-aceite.repository';

const relationshipNames = [];
relationshipNames.push('idProfissional');
relationshipNames.push('idAtendimento');

@Injectable()
export class AtendimentoAceiteService {
  logger = new Logger('AtendimentoAceiteService');

  constructor(@InjectRepository(AtendimentoAceiteRepository) private atendimentoAceiteRepository: AtendimentoAceiteRepository) {}

  async findById(id: string): Promise<AtendimentoAceite | undefined> {
    const options = { relations: relationshipNames };
    return await this.atendimentoAceiteRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<AtendimentoAceite>): Promise<AtendimentoAceite | undefined> {
    return await this.atendimentoAceiteRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<AtendimentoAceite>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[AtendimentoAceite[], number]> {
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
          where += ' `AtendimentoAceite`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `AtendimentoAceite`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.atendimentoAceiteRepository.findAndCount(options);
  }

  async save(atendimentoAceite: AtendimentoAceite): Promise<AtendimentoAceite | undefined> {
    return await this.atendimentoAceiteRepository.save(atendimentoAceite);
  }

  async update(atendimentoAceite: AtendimentoAceite): Promise<AtendimentoAceite | undefined> {
    return await this.save(atendimentoAceite);
  }

  async delete(atendimentoAceite: AtendimentoAceite): Promise<AtendimentoAceite | undefined> {
    return await this.atendimentoAceiteRepository.remove(atendimentoAceite);
  }
}

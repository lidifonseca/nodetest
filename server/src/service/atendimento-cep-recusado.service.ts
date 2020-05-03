import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import AtendimentoCepRecusado from '../domain/atendimento-cep-recusado.entity';
import { AtendimentoCepRecusadoRepository } from '../repository/atendimento-cep-recusado.repository';

const relationshipNames = [];
relationshipNames.push('idPadItem');

@Injectable()
export class AtendimentoCepRecusadoService {
  logger = new Logger('AtendimentoCepRecusadoService');

  constructor(
    @InjectRepository(AtendimentoCepRecusadoRepository) private atendimentoCepRecusadoRepository: AtendimentoCepRecusadoRepository
  ) {}

  async findById(id: string): Promise<AtendimentoCepRecusado | undefined> {
    const options = { relations: relationshipNames };
    return await this.atendimentoCepRecusadoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<AtendimentoCepRecusado>): Promise<AtendimentoCepRecusado | undefined> {
    return await this.atendimentoCepRecusadoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<AtendimentoCepRecusado>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[AtendimentoCepRecusado[], number]> {
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
          where += ' `AtendimentoCepRecusado`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `AtendimentoCepRecusado`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.atendimentoCepRecusadoRepository.findAndCount(options);
  }

  async save(atendimentoCepRecusado: AtendimentoCepRecusado): Promise<AtendimentoCepRecusado | undefined> {
    return await this.atendimentoCepRecusadoRepository.save(atendimentoCepRecusado);
  }

  async update(atendimentoCepRecusado: AtendimentoCepRecusado): Promise<AtendimentoCepRecusado | undefined> {
    return await this.save(atendimentoCepRecusado);
  }

  async delete(atendimentoCepRecusado: AtendimentoCepRecusado): Promise<AtendimentoCepRecusado | undefined> {
    return await this.atendimentoCepRecusadoRepository.remove(atendimentoCepRecusado);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import AtendimentoGlosado from '../domain/atendimento-glosado.entity';
import { AtendimentoGlosadoRepository } from '../repository/atendimento-glosado.repository';

const relationshipNames = [];

@Injectable()
export class AtendimentoGlosadoService {
  logger = new Logger('AtendimentoGlosadoService');

  constructor(@InjectRepository(AtendimentoGlosadoRepository) private atendimentoGlosadoRepository: AtendimentoGlosadoRepository) {}

  async findById(id: string): Promise<AtendimentoGlosado | undefined> {
    const options = { relations: relationshipNames };
    return await this.atendimentoGlosadoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<AtendimentoGlosado>): Promise<AtendimentoGlosado | undefined> {
    return await this.atendimentoGlosadoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<AtendimentoGlosado>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[AtendimentoGlosado[], number]> {
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
          where += ' `AtendimentoGlosado`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `AtendimentoGlosado`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.atendimentoGlosadoRepository.findAndCount(options);
  }

  async save(atendimentoGlosado: AtendimentoGlosado): Promise<AtendimentoGlosado | undefined> {
    return await this.atendimentoGlosadoRepository.save(atendimentoGlosado);
  }

  async update(atendimentoGlosado: AtendimentoGlosado): Promise<AtendimentoGlosado | undefined> {
    return await this.save(atendimentoGlosado);
  }

  async delete(atendimentoGlosado: AtendimentoGlosado): Promise<AtendimentoGlosado | undefined> {
    return await this.atendimentoGlosadoRepository.remove(atendimentoGlosado);
  }
}

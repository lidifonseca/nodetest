import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Acao from '../domain/acao.entity';
import { AcaoRepository } from '../repository/acao.repository';

const relationshipNames = [];

@Injectable()
export class AcaoService {
  logger = new Logger('AcaoService');

  constructor(@InjectRepository(AcaoRepository) private acaoRepository: AcaoRepository) {}

  async findById(id: string): Promise<Acao | undefined> {
    const options = { relations: relationshipNames };
    return await this.acaoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Acao>): Promise<Acao | undefined> {
    return await this.acaoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<Acao>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[Acao[], number]> {
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
          where += ' `Acao`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `Acao`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.acaoRepository.findAndCount(options);
  }

  async save(acao: Acao): Promise<Acao | undefined> {
    return await this.acaoRepository.save(acao);
  }

  async update(acao: Acao): Promise<Acao | undefined> {
    return await this.save(acao);
  }

  async delete(acao: Acao): Promise<Acao | undefined> {
    return await this.acaoRepository.remove(acao);
  }
}

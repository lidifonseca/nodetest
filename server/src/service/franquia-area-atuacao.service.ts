import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import FranquiaAreaAtuacao from '../domain/franquia-area-atuacao.entity';
import { FranquiaAreaAtuacaoRepository } from '../repository/franquia-area-atuacao.repository';

const relationshipNames = [];
relationshipNames.push('idFranquia');

@Injectable()
export class FranquiaAreaAtuacaoService {
  logger = new Logger('FranquiaAreaAtuacaoService');

  constructor(@InjectRepository(FranquiaAreaAtuacaoRepository) private franquiaAreaAtuacaoRepository: FranquiaAreaAtuacaoRepository) {}

  async findById(id: string): Promise<FranquiaAreaAtuacao | undefined> {
    const options = { relations: relationshipNames };
    return await this.franquiaAreaAtuacaoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<FranquiaAreaAtuacao>): Promise<FranquiaAreaAtuacao | undefined> {
    return await this.franquiaAreaAtuacaoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<FranquiaAreaAtuacao>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[FranquiaAreaAtuacao[], number]> {
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
          where += ' `FranquiaAreaAtuacao`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `FranquiaAreaAtuacao`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.franquiaAreaAtuacaoRepository.findAndCount(options);
  }

  async save(franquiaAreaAtuacao: FranquiaAreaAtuacao): Promise<FranquiaAreaAtuacao | undefined> {
    return await this.franquiaAreaAtuacaoRepository.save(franquiaAreaAtuacao);
  }

  async update(franquiaAreaAtuacao: FranquiaAreaAtuacao): Promise<FranquiaAreaAtuacao | undefined> {
    return await this.save(franquiaAreaAtuacao);
  }

  async delete(franquiaAreaAtuacao: FranquiaAreaAtuacao): Promise<FranquiaAreaAtuacao | undefined> {
    return await this.franquiaAreaAtuacaoRepository.remove(franquiaAreaAtuacao);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import UnidadeEasyAreaAtuacao from '../domain/unidade-easy-area-atuacao.entity';
import { UnidadeEasyAreaAtuacaoRepository } from '../repository/unidade-easy-area-atuacao.repository';

const relationshipNames = [];
relationshipNames.push('idUnidade');

@Injectable()
export class UnidadeEasyAreaAtuacaoService {
  logger = new Logger('UnidadeEasyAreaAtuacaoService');

  constructor(
    @InjectRepository(UnidadeEasyAreaAtuacaoRepository) private unidadeEasyAreaAtuacaoRepository: UnidadeEasyAreaAtuacaoRepository
  ) {}

  async findById(id: string): Promise<UnidadeEasyAreaAtuacao | undefined> {
    const options = { relations: relationshipNames };
    return await this.unidadeEasyAreaAtuacaoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<UnidadeEasyAreaAtuacao>): Promise<UnidadeEasyAreaAtuacao | undefined> {
    return await this.unidadeEasyAreaAtuacaoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<UnidadeEasyAreaAtuacao>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[UnidadeEasyAreaAtuacao[], number]> {
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
          where += ' `UnidadeEasyAreaAtuacao`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `UnidadeEasyAreaAtuacao`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.unidadeEasyAreaAtuacaoRepository.findAndCount(options);
  }

  async save(unidadeEasyAreaAtuacao: UnidadeEasyAreaAtuacao): Promise<UnidadeEasyAreaAtuacao | undefined> {
    return await this.unidadeEasyAreaAtuacaoRepository.save(unidadeEasyAreaAtuacao);
  }

  async update(unidadeEasyAreaAtuacao: UnidadeEasyAreaAtuacao): Promise<UnidadeEasyAreaAtuacao | undefined> {
    return await this.save(unidadeEasyAreaAtuacao);
  }

  async delete(unidadeEasyAreaAtuacao: UnidadeEasyAreaAtuacao): Promise<UnidadeEasyAreaAtuacao | undefined> {
    return await this.unidadeEasyAreaAtuacaoRepository.remove(unidadeEasyAreaAtuacao);
  }
}

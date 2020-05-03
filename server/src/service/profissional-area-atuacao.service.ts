import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import ProfissionalAreaAtuacao from '../domain/profissional-area-atuacao.entity';
import { ProfissionalAreaAtuacaoRepository } from '../repository/profissional-area-atuacao.repository';

const relationshipNames = [];

@Injectable()
export class ProfissionalAreaAtuacaoService {
  logger = new Logger('ProfissionalAreaAtuacaoService');

  constructor(
    @InjectRepository(ProfissionalAreaAtuacaoRepository) private profissionalAreaAtuacaoRepository: ProfissionalAreaAtuacaoRepository
  ) {}

  async findById(id: string): Promise<ProfissionalAreaAtuacao | undefined> {
    const options = { relations: relationshipNames };
    return await this.profissionalAreaAtuacaoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<ProfissionalAreaAtuacao>): Promise<ProfissionalAreaAtuacao | undefined> {
    return await this.profissionalAreaAtuacaoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<ProfissionalAreaAtuacao>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[ProfissionalAreaAtuacao[], number]> {
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
          where += ' `ProfissionalAreaAtuacao`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `ProfissionalAreaAtuacao`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.profissionalAreaAtuacaoRepository.findAndCount(options);
  }

  async save(profissionalAreaAtuacao: ProfissionalAreaAtuacao): Promise<ProfissionalAreaAtuacao | undefined> {
    return await this.profissionalAreaAtuacaoRepository.save(profissionalAreaAtuacao);
  }

  async update(profissionalAreaAtuacao: ProfissionalAreaAtuacao): Promise<ProfissionalAreaAtuacao | undefined> {
    return await this.save(profissionalAreaAtuacao);
  }

  async delete(profissionalAreaAtuacao: ProfissionalAreaAtuacao): Promise<ProfissionalAreaAtuacao | undefined> {
    return await this.profissionalAreaAtuacaoRepository.remove(profissionalAreaAtuacao);
  }
}

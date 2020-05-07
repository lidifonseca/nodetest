import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import FranquiaAreaAtuacao from '../domain/franquia-area-atuacao.entity';
import { FranquiaAreaAtuacaoRepository } from '../repository/franquia-area-atuacao.repository';

const relationshipNames = [];

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

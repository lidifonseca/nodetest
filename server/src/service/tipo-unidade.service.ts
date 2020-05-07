import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import TipoUnidade from '../domain/tipo-unidade.entity';
import { TipoUnidadeRepository } from '../repository/tipo-unidade.repository';

const relationshipNames = [];

@Injectable()
export class TipoUnidadeService {
  logger = new Logger('TipoUnidadeService');

  constructor(@InjectRepository(TipoUnidadeRepository) private tipoUnidadeRepository: TipoUnidadeRepository) {}

  async findById(id: string): Promise<TipoUnidade | undefined> {
    const options = { relations: relationshipNames };
    return await this.tipoUnidadeRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<TipoUnidade>): Promise<TipoUnidade | undefined> {
    return await this.tipoUnidadeRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<TipoUnidade>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[TipoUnidade[], number]> {
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
    return await this.tipoUnidadeRepository.findAndCount(options);
  }

  async save(tipoUnidade: TipoUnidade): Promise<TipoUnidade | undefined> {
    return await this.tipoUnidadeRepository.save(tipoUnidade);
  }

  async update(tipoUnidade: TipoUnidade): Promise<TipoUnidade | undefined> {
    return await this.save(tipoUnidade);
  }

  async delete(tipoUnidade: TipoUnidade): Promise<TipoUnidade | undefined> {
    return await this.tipoUnidadeRepository.remove(tipoUnidade);
  }
}

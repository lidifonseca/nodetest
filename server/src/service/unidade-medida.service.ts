import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import UnidadeMedida from '../domain/unidade-medida.entity';
import { UnidadeMedidaRepository } from '../repository/unidade-medida.repository';

const relationshipNames = [];

@Injectable()
export class UnidadeMedidaService {
  logger = new Logger('UnidadeMedidaService');

  constructor(@InjectRepository(UnidadeMedidaRepository) private unidadeMedidaRepository: UnidadeMedidaRepository) {}

  async findById(id: string): Promise<UnidadeMedida | undefined> {
    const options = { relations: relationshipNames };
    return await this.unidadeMedidaRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<UnidadeMedida>): Promise<UnidadeMedida | undefined> {
    return await this.unidadeMedidaRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<UnidadeMedida>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[UnidadeMedida[], number]> {
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
          where += ' `UnidadeMedida`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `UnidadeMedida`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.unidadeMedidaRepository.findAndCount(options);
  }

  async save(unidadeMedida: UnidadeMedida): Promise<UnidadeMedida | undefined> {
    return await this.unidadeMedidaRepository.save(unidadeMedida);
  }

  async update(unidadeMedida: UnidadeMedida): Promise<UnidadeMedida | undefined> {
    return await this.save(unidadeMedida);
  }

  async delete(unidadeMedida: UnidadeMedida): Promise<UnidadeMedida | undefined> {
    return await this.unidadeMedidaRepository.remove(unidadeMedida);
  }
}

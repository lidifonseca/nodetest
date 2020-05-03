import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Atividades from '../domain/atividades.entity';
import { AtividadesRepository } from '../repository/atividades.repository';

const relationshipNames = [];

@Injectable()
export class AtividadesService {
  logger = new Logger('AtividadesService');

  constructor(@InjectRepository(AtividadesRepository) private atividadesRepository: AtividadesRepository) {}

  async findById(id: string): Promise<Atividades | undefined> {
    const options = { relations: relationshipNames };
    return await this.atividadesRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Atividades>): Promise<Atividades | undefined> {
    return await this.atividadesRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<Atividades>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[Atividades[], number]> {
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
          where += ' `Atividades`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `Atividades`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.atividadesRepository.findAndCount(options);
  }

  async save(atividades: Atividades): Promise<Atividades | undefined> {
    return await this.atividadesRepository.save(atividades);
  }

  async update(atividades: Atividades): Promise<Atividades | undefined> {
    return await this.save(atividades);
  }

  async delete(atividades: Atividades): Promise<Atividades | undefined> {
    return await this.atividadesRepository.remove(atividades);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Indicadores from '../domain/indicadores.entity';
import { IndicadoresRepository } from '../repository/indicadores.repository';

const relationshipNames = [];

@Injectable()
export class IndicadoresService {
  logger = new Logger('IndicadoresService');

  constructor(@InjectRepository(IndicadoresRepository) private indicadoresRepository: IndicadoresRepository) {}

  async findById(id: string): Promise<Indicadores | undefined> {
    const options = { relations: relationshipNames };
    return await this.indicadoresRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Indicadores>): Promise<Indicadores | undefined> {
    return await this.indicadoresRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<Indicadores>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[Indicadores[], number]> {
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
          where += ' `Indicadores`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `Indicadores`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.indicadoresRepository.findAndCount(options);
  }

  async save(indicadores: Indicadores): Promise<Indicadores | undefined> {
    return await this.indicadoresRepository.save(indicadores);
  }

  async update(indicadores: Indicadores): Promise<Indicadores | undefined> {
    return await this.save(indicadores);
  }

  async delete(indicadores: Indicadores): Promise<Indicadores | undefined> {
    return await this.indicadoresRepository.remove(indicadores);
  }
}

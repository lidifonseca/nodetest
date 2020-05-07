import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
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

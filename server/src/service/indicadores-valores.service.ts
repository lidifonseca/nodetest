import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import IndicadoresValores from '../domain/indicadores-valores.entity';
import { IndicadoresValoresRepository } from '../repository/indicadores-valores.repository';

const relationshipNames = [];
relationshipNames.push('indicadores');

@Injectable()
export class IndicadoresValoresService {
  logger = new Logger('IndicadoresValoresService');

  constructor(@InjectRepository(IndicadoresValoresRepository) private indicadoresValoresRepository: IndicadoresValoresRepository) {}

  async findById(id: string): Promise<IndicadoresValores | undefined> {
    const options = { relations: relationshipNames };
    return await this.indicadoresValoresRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<IndicadoresValores>): Promise<IndicadoresValores | undefined> {
    return await this.indicadoresValoresRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<IndicadoresValores>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[IndicadoresValores[], number]> {
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
    return await this.indicadoresValoresRepository.findAndCount(options);
  }

  async save(indicadoresValores: IndicadoresValores): Promise<IndicadoresValores | undefined> {
    return await this.indicadoresValoresRepository.save(indicadoresValores);
  }

  async update(indicadoresValores: IndicadoresValores): Promise<IndicadoresValores | undefined> {
    return await this.save(indicadoresValores);
  }

  async delete(indicadoresValores: IndicadoresValores): Promise<IndicadoresValores | undefined> {
    return await this.indicadoresValoresRepository.remove(indicadoresValores);
  }
}

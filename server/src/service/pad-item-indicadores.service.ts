import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import PadItemIndicadores from '../domain/pad-item-indicadores.entity';
import { PadItemIndicadoresRepository } from '../repository/pad-item-indicadores.repository';

const relationshipNames = [];

@Injectable()
export class PadItemIndicadoresService {
  logger = new Logger('PadItemIndicadoresService');

  constructor(@InjectRepository(PadItemIndicadoresRepository) private padItemIndicadoresRepository: PadItemIndicadoresRepository) {}

  async findById(id: string): Promise<PadItemIndicadores | undefined> {
    const options = { relations: relationshipNames };
    return await this.padItemIndicadoresRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PadItemIndicadores>): Promise<PadItemIndicadores | undefined> {
    return await this.padItemIndicadoresRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<PadItemIndicadores>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[PadItemIndicadores[], number]> {
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
          where += ' `PadItemIndicadores`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `PadItemIndicadores`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.padItemIndicadoresRepository.findAndCount(options);
  }

  async save(padItemIndicadores: PadItemIndicadores): Promise<PadItemIndicadores | undefined> {
    return await this.padItemIndicadoresRepository.save(padItemIndicadores);
  }

  async update(padItemIndicadores: PadItemIndicadores): Promise<PadItemIndicadores | undefined> {
    return await this.save(padItemIndicadores);
  }

  async delete(padItemIndicadores: PadItemIndicadores): Promise<PadItemIndicadores | undefined> {
    return await this.padItemIndicadoresRepository.remove(padItemIndicadores);
  }
}

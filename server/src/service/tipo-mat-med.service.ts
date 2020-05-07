import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import TipoMatMed from '../domain/tipo-mat-med.entity';
import { TipoMatMedRepository } from '../repository/tipo-mat-med.repository';

const relationshipNames = [];

@Injectable()
export class TipoMatMedService {
  logger = new Logger('TipoMatMedService');

  constructor(@InjectRepository(TipoMatMedRepository) private tipoMatMedRepository: TipoMatMedRepository) {}

  async findById(id: string): Promise<TipoMatMed | undefined> {
    const options = { relations: relationshipNames };
    return await this.tipoMatMedRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<TipoMatMed>): Promise<TipoMatMed | undefined> {
    return await this.tipoMatMedRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<TipoMatMed>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[TipoMatMed[], number]> {
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
    return await this.tipoMatMedRepository.findAndCount(options);
  }

  async save(tipoMatMed: TipoMatMed): Promise<TipoMatMed | undefined> {
    return await this.tipoMatMedRepository.save(tipoMatMed);
  }

  async update(tipoMatMed: TipoMatMed): Promise<TipoMatMed | undefined> {
    return await this.save(tipoMatMed);
  }

  async delete(tipoMatMed: TipoMatMed): Promise<TipoMatMed | undefined> {
    return await this.tipoMatMedRepository.remove(tipoMatMed);
  }
}

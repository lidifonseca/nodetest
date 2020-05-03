import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import TempoExperiencia from '../domain/tempo-experiencia.entity';
import { TempoExperienciaRepository } from '../repository/tempo-experiencia.repository';

const relationshipNames = [];

@Injectable()
export class TempoExperienciaService {
  logger = new Logger('TempoExperienciaService');

  constructor(@InjectRepository(TempoExperienciaRepository) private tempoExperienciaRepository: TempoExperienciaRepository) {}

  async findById(id: string): Promise<TempoExperiencia | undefined> {
    const options = { relations: relationshipNames };
    return await this.tempoExperienciaRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<TempoExperiencia>): Promise<TempoExperiencia | undefined> {
    return await this.tempoExperienciaRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<TempoExperiencia>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[TempoExperiencia[], number]> {
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
          where += ' `TempoExperiencia`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `TempoExperiencia`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.tempoExperienciaRepository.findAndCount(options);
  }

  async save(tempoExperiencia: TempoExperiencia): Promise<TempoExperiencia | undefined> {
    return await this.tempoExperienciaRepository.save(tempoExperiencia);
  }

  async update(tempoExperiencia: TempoExperiencia): Promise<TempoExperiencia | undefined> {
    return await this.save(tempoExperiencia);
  }

  async delete(tempoExperiencia: TempoExperiencia): Promise<TempoExperiencia | undefined> {
    return await this.tempoExperienciaRepository.remove(tempoExperiencia);
  }
}

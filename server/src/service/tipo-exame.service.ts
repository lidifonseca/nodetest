import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import TipoExame from '../domain/tipo-exame.entity';
import { TipoExameRepository } from '../repository/tipo-exame.repository';

const relationshipNames = [];

@Injectable()
export class TipoExameService {
  logger = new Logger('TipoExameService');

  constructor(@InjectRepository(TipoExameRepository) private tipoExameRepository: TipoExameRepository) {}

  async findById(id: string): Promise<TipoExame | undefined> {
    const options = { relations: relationshipNames };
    return await this.tipoExameRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<TipoExame>): Promise<TipoExame | undefined> {
    return await this.tipoExameRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<TipoExame>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[TipoExame[], number]> {
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
    return await this.tipoExameRepository.findAndCount(options);
  }

  async save(tipoExame: TipoExame): Promise<TipoExame | undefined> {
    return await this.tipoExameRepository.save(tipoExame);
  }

  async update(tipoExame: TipoExame): Promise<TipoExame | undefined> {
    return await this.save(tipoExame);
  }

  async delete(tipoExame: TipoExame): Promise<TipoExame | undefined> {
    return await this.tipoExameRepository.remove(tipoExame);
  }
}

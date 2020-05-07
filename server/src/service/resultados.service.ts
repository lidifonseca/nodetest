import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import Resultados from '../domain/resultados.entity';
import { ResultadosRepository } from '../repository/resultados.repository';

const relationshipNames = [];

@Injectable()
export class ResultadosService {
  logger = new Logger('ResultadosService');

  constructor(@InjectRepository(ResultadosRepository) private resultadosRepository: ResultadosRepository) {}

  async findById(id: string): Promise<Resultados | undefined> {
    const options = { relations: relationshipNames };
    return await this.resultadosRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Resultados>): Promise<Resultados | undefined> {
    return await this.resultadosRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<Resultados>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[Resultados[], number]> {
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
    return await this.resultadosRepository.findAndCount(options);
  }

  async save(resultados: Resultados): Promise<Resultados | undefined> {
    return await this.resultadosRepository.save(resultados);
  }

  async update(resultados: Resultados): Promise<Resultados | undefined> {
    return await this.save(resultados);
  }

  async delete(resultados: Resultados): Promise<Resultados | undefined> {
    return await this.resultadosRepository.remove(resultados);
  }
}

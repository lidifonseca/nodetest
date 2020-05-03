import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import TipoEspecialidade from '../domain/tipo-especialidade.entity';
import { TipoEspecialidadeRepository } from '../repository/tipo-especialidade.repository';

const relationshipNames = [];

@Injectable()
export class TipoEspecialidadeService {
  logger = new Logger('TipoEspecialidadeService');

  constructor(@InjectRepository(TipoEspecialidadeRepository) private tipoEspecialidadeRepository: TipoEspecialidadeRepository) {}

  async findById(id: string): Promise<TipoEspecialidade | undefined> {
    const options = { relations: relationshipNames };
    return await this.tipoEspecialidadeRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<TipoEspecialidade>): Promise<TipoEspecialidade | undefined> {
    return await this.tipoEspecialidadeRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<TipoEspecialidade>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[TipoEspecialidade[], number]> {
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
          where += ' `TipoEspecialidade`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `TipoEspecialidade`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.tipoEspecialidadeRepository.findAndCount(options);
  }

  async save(tipoEspecialidade: TipoEspecialidade): Promise<TipoEspecialidade | undefined> {
    return await this.tipoEspecialidadeRepository.save(tipoEspecialidade);
  }

  async update(tipoEspecialidade: TipoEspecialidade): Promise<TipoEspecialidade | undefined> {
    return await this.save(tipoEspecialidade);
  }

  async delete(tipoEspecialidade: TipoEspecialidade): Promise<TipoEspecialidade | undefined> {
    return await this.tipoEspecialidadeRepository.remove(tipoEspecialidade);
  }
}

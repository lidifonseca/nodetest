import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import EspecialidadeOperadora from '../domain/especialidade-operadora.entity';
import { EspecialidadeOperadoraRepository } from '../repository/especialidade-operadora.repository';

const relationshipNames = [];

@Injectable()
export class EspecialidadeOperadoraService {
  logger = new Logger('EspecialidadeOperadoraService');

  constructor(
    @InjectRepository(EspecialidadeOperadoraRepository) private especialidadeOperadoraRepository: EspecialidadeOperadoraRepository
  ) {}

  async findById(id: string): Promise<EspecialidadeOperadora | undefined> {
    const options = { relations: relationshipNames };
    return await this.especialidadeOperadoraRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<EspecialidadeOperadora>): Promise<EspecialidadeOperadora | undefined> {
    return await this.especialidadeOperadoraRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<EspecialidadeOperadora>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[EspecialidadeOperadora[], number]> {
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
    return await this.especialidadeOperadoraRepository.findAndCount(options);
  }

  async save(especialidadeOperadora: EspecialidadeOperadora): Promise<EspecialidadeOperadora | undefined> {
    return await this.especialidadeOperadoraRepository.save(especialidadeOperadora);
  }

  async update(especialidadeOperadora: EspecialidadeOperadora): Promise<EspecialidadeOperadora | undefined> {
    return await this.save(especialidadeOperadora);
  }

  async delete(especialidadeOperadora: EspecialidadeOperadora): Promise<EspecialidadeOperadora | undefined> {
    return await this.especialidadeOperadoraRepository.remove(especialidadeOperadora);
  }
}

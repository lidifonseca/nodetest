import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import EspecialidadeOperadora from '../domain/especialidade-operadora.entity';
import { EspecialidadeOperadoraRepository } from '../repository/especialidade-operadora.repository';

const relationshipNames = [];
relationshipNames.push('idOperadora');
relationshipNames.push('idEspecialidade');

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
          where += ' `EspecialidadeOperadora`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `EspecialidadeOperadora`.`' + element['column'] + '` = "' + element['value'] + '" ';
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

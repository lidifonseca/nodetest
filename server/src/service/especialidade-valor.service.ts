import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import EspecialidadeValor from '../domain/especialidade-valor.entity';
import { EspecialidadeValorRepository } from '../repository/especialidade-valor.repository';

const relationshipNames = [];
relationshipNames.push('idEspecialidade');

@Injectable()
export class EspecialidadeValorService {
  logger = new Logger('EspecialidadeValorService');

  constructor(@InjectRepository(EspecialidadeValorRepository) private especialidadeValorRepository: EspecialidadeValorRepository) {}

  async findById(id: string): Promise<EspecialidadeValor | undefined> {
    const options = { relations: relationshipNames };
    return await this.especialidadeValorRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<EspecialidadeValor>): Promise<EspecialidadeValor | undefined> {
    return await this.especialidadeValorRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<EspecialidadeValor>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[EspecialidadeValor[], number]> {
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
          where += ' `EspecialidadeValor`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `EspecialidadeValor`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.especialidadeValorRepository.findAndCount(options);
  }

  async save(especialidadeValor: EspecialidadeValor): Promise<EspecialidadeValor | undefined> {
    return await this.especialidadeValorRepository.save(especialidadeValor);
  }

  async update(especialidadeValor: EspecialidadeValor): Promise<EspecialidadeValor | undefined> {
    return await this.save(especialidadeValor);
  }

  async delete(especialidadeValor: EspecialidadeValor): Promise<EspecialidadeValor | undefined> {
    return await this.especialidadeValorRepository.remove(especialidadeValor);
  }
}

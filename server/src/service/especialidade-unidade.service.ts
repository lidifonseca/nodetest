import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import EspecialidadeUnidade from '../domain/especialidade-unidade.entity';
import { EspecialidadeUnidadeRepository } from '../repository/especialidade-unidade.repository';

const relationshipNames = [];
relationshipNames.push('idUnidade');
relationshipNames.push('idEspecialidade');

@Injectable()
export class EspecialidadeUnidadeService {
  logger = new Logger('EspecialidadeUnidadeService');

  constructor(@InjectRepository(EspecialidadeUnidadeRepository) private especialidadeUnidadeRepository: EspecialidadeUnidadeRepository) {}

  async findById(id: string): Promise<EspecialidadeUnidade | undefined> {
    const options = { relations: relationshipNames };
    return await this.especialidadeUnidadeRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<EspecialidadeUnidade>): Promise<EspecialidadeUnidade | undefined> {
    return await this.especialidadeUnidadeRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<EspecialidadeUnidade>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[EspecialidadeUnidade[], number]> {
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
          where += ' `EspecialidadeUnidade`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `EspecialidadeUnidade`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.especialidadeUnidadeRepository.findAndCount(options);
  }

  async save(especialidadeUnidade: EspecialidadeUnidade): Promise<EspecialidadeUnidade | undefined> {
    return await this.especialidadeUnidadeRepository.save(especialidadeUnidade);
  }

  async update(especialidadeUnidade: EspecialidadeUnidade): Promise<EspecialidadeUnidade | undefined> {
    return await this.save(especialidadeUnidade);
  }

  async delete(especialidadeUnidade: EspecialidadeUnidade): Promise<EspecialidadeUnidade | undefined> {
    return await this.especialidadeUnidadeRepository.remove(especialidadeUnidade);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Especialidade from '../domain/especialidade.entity';
import { EspecialidadeRepository } from '../repository/especialidade.repository';

const relationshipNames = [];
relationshipNames.push('idCategoria');
relationshipNames.push('idTipoEspecialidade');
relationshipNames.push('idTipoUnidade');

@Injectable()
export class EspecialidadeService {
  logger = new Logger('EspecialidadeService');

  constructor(@InjectRepository(EspecialidadeRepository) private especialidadeRepository: EspecialidadeRepository) {}

  async findById(id: string): Promise<Especialidade | undefined> {
    const options = { relations: relationshipNames };
    return await this.especialidadeRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Especialidade>): Promise<Especialidade | undefined> {
    return await this.especialidadeRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<Especialidade>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[Especialidade[], number]> {
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
          where += ' `Especialidade`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `Especialidade`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.especialidadeRepository.findAndCount(options);
  }

  async save(especialidade: Especialidade): Promise<Especialidade | undefined> {
    return await this.especialidadeRepository.save(especialidade);
  }

  async update(especialidade: Especialidade): Promise<Especialidade | undefined> {
    return await this.save(especialidade);
  }

  async delete(especialidade: Especialidade): Promise<Especialidade | undefined> {
    return await this.especialidadeRepository.remove(especialidade);
  }
}

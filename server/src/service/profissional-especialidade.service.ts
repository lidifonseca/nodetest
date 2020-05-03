import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import ProfissionalEspecialidade from '../domain/profissional-especialidade.entity';
import { ProfissionalEspecialidadeRepository } from '../repository/profissional-especialidade.repository';

const relationshipNames = [];

@Injectable()
export class ProfissionalEspecialidadeService {
  logger = new Logger('ProfissionalEspecialidadeService');

  constructor(
    @InjectRepository(ProfissionalEspecialidadeRepository) private profissionalEspecialidadeRepository: ProfissionalEspecialidadeRepository
  ) {}

  async findById(id: string): Promise<ProfissionalEspecialidade | undefined> {
    const options = { relations: relationshipNames };
    return await this.profissionalEspecialidadeRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<ProfissionalEspecialidade>): Promise<ProfissionalEspecialidade | undefined> {
    return await this.profissionalEspecialidadeRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<ProfissionalEspecialidade>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[ProfissionalEspecialidade[], number]> {
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
          where += ' `ProfissionalEspecialidade`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `ProfissionalEspecialidade`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.profissionalEspecialidadeRepository.findAndCount(options);
  }

  async save(profissionalEspecialidade: ProfissionalEspecialidade): Promise<ProfissionalEspecialidade | undefined> {
    return await this.profissionalEspecialidadeRepository.save(profissionalEspecialidade);
  }

  async update(profissionalEspecialidade: ProfissionalEspecialidade): Promise<ProfissionalEspecialidade | undefined> {
    return await this.save(profissionalEspecialidade);
  }

  async delete(profissionalEspecialidade: ProfissionalEspecialidade): Promise<ProfissionalEspecialidade | undefined> {
    return await this.profissionalEspecialidadeRepository.remove(profissionalEspecialidade);
  }
}

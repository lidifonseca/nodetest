import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import ProfissionalEspecialidadeNew from '../domain/profissional-especialidade-new.entity';
import { ProfissionalEspecialidadeNewRepository } from '../repository/profissional-especialidade-new.repository';

const relationshipNames = [];

@Injectable()
export class ProfissionalEspecialidadeNewService {
  logger = new Logger('ProfissionalEspecialidadeNewService');

  constructor(
    @InjectRepository(ProfissionalEspecialidadeNewRepository)
    private profissionalEspecialidadeNewRepository: ProfissionalEspecialidadeNewRepository
  ) {}

  async findById(id: string): Promise<ProfissionalEspecialidadeNew | undefined> {
    const options = { relations: relationshipNames };
    return await this.profissionalEspecialidadeNewRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<ProfissionalEspecialidadeNew>): Promise<ProfissionalEspecialidadeNew | undefined> {
    return await this.profissionalEspecialidadeNewRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<ProfissionalEspecialidadeNew>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[ProfissionalEspecialidadeNew[], number]> {
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
    return await this.profissionalEspecialidadeNewRepository.findAndCount(options);
  }

  async save(profissionalEspecialidadeNew: ProfissionalEspecialidadeNew): Promise<ProfissionalEspecialidadeNew | undefined> {
    return await this.profissionalEspecialidadeNewRepository.save(profissionalEspecialidadeNew);
  }

  async update(profissionalEspecialidadeNew: ProfissionalEspecialidadeNew): Promise<ProfissionalEspecialidadeNew | undefined> {
    return await this.save(profissionalEspecialidadeNew);
  }

  async delete(profissionalEspecialidadeNew: ProfissionalEspecialidadeNew): Promise<ProfissionalEspecialidadeNew | undefined> {
    return await this.profissionalEspecialidadeNewRepository.remove(profissionalEspecialidadeNew);
  }
}

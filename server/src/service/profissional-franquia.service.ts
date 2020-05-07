import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import ProfissionalFranquia from '../domain/profissional-franquia.entity';
import { ProfissionalFranquiaRepository } from '../repository/profissional-franquia.repository';

const relationshipNames = [];

@Injectable()
export class ProfissionalFranquiaService {
  logger = new Logger('ProfissionalFranquiaService');

  constructor(@InjectRepository(ProfissionalFranquiaRepository) private profissionalFranquiaRepository: ProfissionalFranquiaRepository) {}

  async findById(id: string): Promise<ProfissionalFranquia | undefined> {
    const options = { relations: relationshipNames };
    return await this.profissionalFranquiaRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<ProfissionalFranquia>): Promise<ProfissionalFranquia | undefined> {
    return await this.profissionalFranquiaRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<ProfissionalFranquia>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[ProfissionalFranquia[], number]> {
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
    return await this.profissionalFranquiaRepository.findAndCount(options);
  }

  async save(profissionalFranquia: ProfissionalFranquia): Promise<ProfissionalFranquia | undefined> {
    return await this.profissionalFranquiaRepository.save(profissionalFranquia);
  }

  async update(profissionalFranquia: ProfissionalFranquia): Promise<ProfissionalFranquia | undefined> {
    return await this.save(profissionalFranquia);
  }

  async delete(profissionalFranquia: ProfissionalFranquia): Promise<ProfissionalFranquia | undefined> {
    return await this.profissionalFranquiaRepository.remove(profissionalFranquia);
  }
}

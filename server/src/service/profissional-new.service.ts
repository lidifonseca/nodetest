import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import ProfissionalNew from '../domain/profissional-new.entity';
import { ProfissionalNewRepository } from '../repository/profissional-new.repository';

const relationshipNames = [];
relationshipNames.push('unidade');

@Injectable()
export class ProfissionalNewService {
  logger = new Logger('ProfissionalNewService');

  constructor(@InjectRepository(ProfissionalNewRepository) private profissionalNewRepository: ProfissionalNewRepository) {}

  async findById(id: string): Promise<ProfissionalNew | undefined> {
    const options = { relations: relationshipNames };
    return await this.profissionalNewRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<ProfissionalNew>): Promise<ProfissionalNew | undefined> {
    return await this.profissionalNewRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<ProfissionalNew>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[ProfissionalNew[], number]> {
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
    return await this.profissionalNewRepository.findAndCount(options);
  }

  async save(profissionalNew: ProfissionalNew): Promise<ProfissionalNew | undefined> {
    return await this.profissionalNewRepository.save(profissionalNew);
  }

  async update(profissionalNew: ProfissionalNew): Promise<ProfissionalNew | undefined> {
    return await this.save(profissionalNew);
  }

  async delete(profissionalNew: ProfissionalNew): Promise<ProfissionalNew | undefined> {
    return await this.profissionalNewRepository.remove(profissionalNew);
  }
}

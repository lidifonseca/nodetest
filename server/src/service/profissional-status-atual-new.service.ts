import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import ProfissionalStatusAtualNew from '../domain/profissional-status-atual-new.entity';
import { ProfissionalStatusAtualNewRepository } from '../repository/profissional-status-atual-new.repository';

const relationshipNames = [];

@Injectable()
export class ProfissionalStatusAtualNewService {
  logger = new Logger('ProfissionalStatusAtualNewService');

  constructor(
    @InjectRepository(ProfissionalStatusAtualNewRepository)
    private profissionalStatusAtualNewRepository: ProfissionalStatusAtualNewRepository
  ) {}

  async findById(id: string): Promise<ProfissionalStatusAtualNew | undefined> {
    const options = { relations: relationshipNames };
    return await this.profissionalStatusAtualNewRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<ProfissionalStatusAtualNew>): Promise<ProfissionalStatusAtualNew | undefined> {
    return await this.profissionalStatusAtualNewRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<ProfissionalStatusAtualNew>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[ProfissionalStatusAtualNew[], number]> {
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
          where += ' `ProfissionalStatusAtualNew`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `ProfissionalStatusAtualNew`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.profissionalStatusAtualNewRepository.findAndCount(options);
  }

  async save(profissionalStatusAtualNew: ProfissionalStatusAtualNew): Promise<ProfissionalStatusAtualNew | undefined> {
    return await this.profissionalStatusAtualNewRepository.save(profissionalStatusAtualNew);
  }

  async update(profissionalStatusAtualNew: ProfissionalStatusAtualNew): Promise<ProfissionalStatusAtualNew | undefined> {
    return await this.save(profissionalStatusAtualNew);
  }

  async delete(profissionalStatusAtualNew: ProfissionalStatusAtualNew): Promise<ProfissionalStatusAtualNew | undefined> {
    return await this.profissionalStatusAtualNewRepository.remove(profissionalStatusAtualNew);
  }
}

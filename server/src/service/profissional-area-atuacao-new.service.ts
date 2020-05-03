import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import ProfissionalAreaAtuacaoNew from '../domain/profissional-area-atuacao-new.entity';
import { ProfissionalAreaAtuacaoNewRepository } from '../repository/profissional-area-atuacao-new.repository';

const relationshipNames = [];

@Injectable()
export class ProfissionalAreaAtuacaoNewService {
  logger = new Logger('ProfissionalAreaAtuacaoNewService');

  constructor(
    @InjectRepository(ProfissionalAreaAtuacaoNewRepository)
    private profissionalAreaAtuacaoNewRepository: ProfissionalAreaAtuacaoNewRepository
  ) {}

  async findById(id: string): Promise<ProfissionalAreaAtuacaoNew | undefined> {
    const options = { relations: relationshipNames };
    return await this.profissionalAreaAtuacaoNewRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<ProfissionalAreaAtuacaoNew>): Promise<ProfissionalAreaAtuacaoNew | undefined> {
    return await this.profissionalAreaAtuacaoNewRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<ProfissionalAreaAtuacaoNew>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[ProfissionalAreaAtuacaoNew[], number]> {
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
          where += ' `ProfissionalAreaAtuacaoNew`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `ProfissionalAreaAtuacaoNew`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.profissionalAreaAtuacaoNewRepository.findAndCount(options);
  }

  async save(profissionalAreaAtuacaoNew: ProfissionalAreaAtuacaoNew): Promise<ProfissionalAreaAtuacaoNew | undefined> {
    return await this.profissionalAreaAtuacaoNewRepository.save(profissionalAreaAtuacaoNew);
  }

  async update(profissionalAreaAtuacaoNew: ProfissionalAreaAtuacaoNew): Promise<ProfissionalAreaAtuacaoNew | undefined> {
    return await this.save(profissionalAreaAtuacaoNew);
  }

  async delete(profissionalAreaAtuacaoNew: ProfissionalAreaAtuacaoNew): Promise<ProfissionalAreaAtuacaoNew | undefined> {
    return await this.profissionalAreaAtuacaoNewRepository.remove(profissionalAreaAtuacaoNew);
  }
}

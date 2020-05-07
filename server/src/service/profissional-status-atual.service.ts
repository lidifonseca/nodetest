import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import ProfissionalStatusAtual from '../domain/profissional-status-atual.entity';
import { ProfissionalStatusAtualRepository } from '../repository/profissional-status-atual.repository';

const relationshipNames = [];

@Injectable()
export class ProfissionalStatusAtualService {
  logger = new Logger('ProfissionalStatusAtualService');

  constructor(
    @InjectRepository(ProfissionalStatusAtualRepository) private profissionalStatusAtualRepository: ProfissionalStatusAtualRepository
  ) {}

  async findById(id: string): Promise<ProfissionalStatusAtual | undefined> {
    const options = { relations: relationshipNames };
    return await this.profissionalStatusAtualRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<ProfissionalStatusAtual>): Promise<ProfissionalStatusAtual | undefined> {
    return await this.profissionalStatusAtualRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<ProfissionalStatusAtual>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[ProfissionalStatusAtual[], number]> {
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
    return await this.profissionalStatusAtualRepository.findAndCount(options);
  }

  async save(profissionalStatusAtual: ProfissionalStatusAtual): Promise<ProfissionalStatusAtual | undefined> {
    return await this.profissionalStatusAtualRepository.save(profissionalStatusAtual);
  }

  async update(profissionalStatusAtual: ProfissionalStatusAtual): Promise<ProfissionalStatusAtual | undefined> {
    return await this.save(profissionalStatusAtual);
  }

  async delete(profissionalStatusAtual: ProfissionalStatusAtual): Promise<ProfissionalStatusAtual | undefined> {
    return await this.profissionalStatusAtualRepository.remove(profissionalStatusAtual);
  }
}

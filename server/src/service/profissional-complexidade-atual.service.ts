import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import ProfissionalComplexidadeAtual from '../domain/profissional-complexidade-atual.entity';
import { ProfissionalComplexidadeAtualRepository } from '../repository/profissional-complexidade-atual.repository';

const relationshipNames = [];

@Injectable()
export class ProfissionalComplexidadeAtualService {
  logger = new Logger('ProfissionalComplexidadeAtualService');

  constructor(
    @InjectRepository(ProfissionalComplexidadeAtualRepository)
    private profissionalComplexidadeAtualRepository: ProfissionalComplexidadeAtualRepository
  ) {}

  async findById(id: string): Promise<ProfissionalComplexidadeAtual | undefined> {
    const options = { relations: relationshipNames };
    return await this.profissionalComplexidadeAtualRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<ProfissionalComplexidadeAtual>): Promise<ProfissionalComplexidadeAtual | undefined> {
    return await this.profissionalComplexidadeAtualRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<ProfissionalComplexidadeAtual>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[ProfissionalComplexidadeAtual[], number]> {
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
    return await this.profissionalComplexidadeAtualRepository.findAndCount(options);
  }

  async save(profissionalComplexidadeAtual: ProfissionalComplexidadeAtual): Promise<ProfissionalComplexidadeAtual | undefined> {
    return await this.profissionalComplexidadeAtualRepository.save(profissionalComplexidadeAtual);
  }

  async update(profissionalComplexidadeAtual: ProfissionalComplexidadeAtual): Promise<ProfissionalComplexidadeAtual | undefined> {
    return await this.save(profissionalComplexidadeAtual);
  }

  async delete(profissionalComplexidadeAtual: ProfissionalComplexidadeAtual): Promise<ProfissionalComplexidadeAtual | undefined> {
    return await this.profissionalComplexidadeAtualRepository.remove(profissionalComplexidadeAtual);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import ProfissionalDispositivoComplexidadeAtual from '../domain/profissional-dispositivo-complexidade-atual.entity';
import { ProfissionalDispositivoComplexidadeAtualRepository } from '../repository/profissional-dispositivo-complexidade-atual.repository';

const relationshipNames = [];

@Injectable()
export class ProfissionalDispositivoComplexidadeAtualService {
  logger = new Logger('ProfissionalDispositivoComplexidadeAtualService');

  constructor(
    @InjectRepository(ProfissionalDispositivoComplexidadeAtualRepository)
    private profissionalDispositivoComplexidadeAtualRepository: ProfissionalDispositivoComplexidadeAtualRepository
  ) {}

  async findById(id: string): Promise<ProfissionalDispositivoComplexidadeAtual | undefined> {
    const options = { relations: relationshipNames };
    return await this.profissionalDispositivoComplexidadeAtualRepository.findOne(id, options);
  }

  async findByfields(
    options: FindOneOptions<ProfissionalDispositivoComplexidadeAtual>
  ): Promise<ProfissionalDispositivoComplexidadeAtual | undefined> {
    return await this.profissionalDispositivoComplexidadeAtualRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<ProfissionalDispositivoComplexidadeAtual>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[ProfissionalDispositivoComplexidadeAtual[], number]> {
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
          where += ' `ProfissionalDispositivoComplexidadeAtual`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `ProfissionalDispositivoComplexidadeAtual`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.profissionalDispositivoComplexidadeAtualRepository.findAndCount(options);
  }

  async save(
    profissionalDispositivoComplexidadeAtual: ProfissionalDispositivoComplexidadeAtual
  ): Promise<ProfissionalDispositivoComplexidadeAtual | undefined> {
    return await this.profissionalDispositivoComplexidadeAtualRepository.save(profissionalDispositivoComplexidadeAtual);
  }

  async update(
    profissionalDispositivoComplexidadeAtual: ProfissionalDispositivoComplexidadeAtual
  ): Promise<ProfissionalDispositivoComplexidadeAtual | undefined> {
    return await this.save(profissionalDispositivoComplexidadeAtual);
  }

  async delete(
    profissionalDispositivoComplexidadeAtual: ProfissionalDispositivoComplexidadeAtual
  ): Promise<ProfissionalDispositivoComplexidadeAtual | undefined> {
    return await this.profissionalDispositivoComplexidadeAtualRepository.remove(profissionalDispositivoComplexidadeAtual);
  }
}

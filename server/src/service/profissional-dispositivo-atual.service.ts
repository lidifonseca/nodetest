import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import ProfissionalDispositivoAtual from '../domain/profissional-dispositivo-atual.entity';
import { ProfissionalDispositivoAtualRepository } from '../repository/profissional-dispositivo-atual.repository';

const relationshipNames = [];

@Injectable()
export class ProfissionalDispositivoAtualService {
  logger = new Logger('ProfissionalDispositivoAtualService');

  constructor(
    @InjectRepository(ProfissionalDispositivoAtualRepository)
    private profissionalDispositivoAtualRepository: ProfissionalDispositivoAtualRepository
  ) {}

  async findById(id: string): Promise<ProfissionalDispositivoAtual | undefined> {
    const options = { relations: relationshipNames };
    return await this.profissionalDispositivoAtualRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<ProfissionalDispositivoAtual>): Promise<ProfissionalDispositivoAtual | undefined> {
    return await this.profissionalDispositivoAtualRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<ProfissionalDispositivoAtual>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[ProfissionalDispositivoAtual[], number]> {
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
          where += ' `ProfissionalDispositivoAtual`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `ProfissionalDispositivoAtual`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.profissionalDispositivoAtualRepository.findAndCount(options);
  }

  async save(profissionalDispositivoAtual: ProfissionalDispositivoAtual): Promise<ProfissionalDispositivoAtual | undefined> {
    return await this.profissionalDispositivoAtualRepository.save(profissionalDispositivoAtual);
  }

  async update(profissionalDispositivoAtual: ProfissionalDispositivoAtual): Promise<ProfissionalDispositivoAtual | undefined> {
    return await this.save(profissionalDispositivoAtual);
  }

  async delete(profissionalDispositivoAtual: ProfissionalDispositivoAtual): Promise<ProfissionalDispositivoAtual | undefined> {
    return await this.profissionalDispositivoAtualRepository.remove(profissionalDispositivoAtual);
  }
}

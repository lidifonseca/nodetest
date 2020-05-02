import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Pesquisa from '../domain/pesquisa.entity';
import { PesquisaRepository } from '../repository/pesquisa.repository';

const relationshipNames = [];
relationshipNames.push('user');
relationshipNames.push('processos');
relationshipNames.push('comarcas');
relationshipNames.push('estado');

@Injectable()
export class PesquisaService {
  logger = new Logger('PesquisaService');

  constructor(@InjectRepository(PesquisaRepository) private pesquisaRepository: PesquisaRepository) {}

  async findById(id: string): Promise<Pesquisa | undefined> {
    const options = { relations: relationshipNames };
    return await this.pesquisaRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Pesquisa>): Promise<Pesquisa | undefined> {
    return await this.pesquisaRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<Pesquisa>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[Pesquisa[], number]> {
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
          where += ' `Apenso`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `Apenso`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.pesquisaRepository.findAndCount(options);
  }

  async save(pesquisa: Pesquisa): Promise<Pesquisa | undefined> {
    return await this.pesquisaRepository.save(pesquisa);
  }

  async update(pesquisa: Pesquisa): Promise<Pesquisa | undefined> {
    return await this.save(pesquisa);
  }

  async delete(pesquisa: Pesquisa): Promise<Pesquisa | undefined> {
    return await this.pesquisaRepository.remove(pesquisa);
  }
}

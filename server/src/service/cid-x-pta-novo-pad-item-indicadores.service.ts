import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import CidXPtaNovoPadItemIndicadores from '../domain/cid-x-pta-novo-pad-item-indicadores.entity';
import { CidXPtaNovoPadItemIndicadoresRepository } from '../repository/cid-x-pta-novo-pad-item-indicadores.repository';

const relationshipNames = [];
relationshipNames.push('padItemIndicadoresId');
relationshipNames.push('categoriasId');
relationshipNames.push('cidXPtaNovoId');

@Injectable()
export class CidXPtaNovoPadItemIndicadoresService {
  logger = new Logger('CidXPtaNovoPadItemIndicadoresService');

  constructor(
    @InjectRepository(CidXPtaNovoPadItemIndicadoresRepository)
    private cidXPtaNovoPadItemIndicadoresRepository: CidXPtaNovoPadItemIndicadoresRepository
  ) {}

  async findById(id: string): Promise<CidXPtaNovoPadItemIndicadores | undefined> {
    const options = { relations: relationshipNames };
    return await this.cidXPtaNovoPadItemIndicadoresRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<CidXPtaNovoPadItemIndicadores>): Promise<CidXPtaNovoPadItemIndicadores | undefined> {
    return await this.cidXPtaNovoPadItemIndicadoresRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<CidXPtaNovoPadItemIndicadores>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[CidXPtaNovoPadItemIndicadores[], number]> {
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
          where += ' `CidXPtaNovoPadItemIndicadores`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `CidXPtaNovoPadItemIndicadores`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.cidXPtaNovoPadItemIndicadoresRepository.findAndCount(options);
  }

  async save(cidXPtaNovoPadItemIndicadores: CidXPtaNovoPadItemIndicadores): Promise<CidXPtaNovoPadItemIndicadores | undefined> {
    return await this.cidXPtaNovoPadItemIndicadoresRepository.save(cidXPtaNovoPadItemIndicadores);
  }

  async update(cidXPtaNovoPadItemIndicadores: CidXPtaNovoPadItemIndicadores): Promise<CidXPtaNovoPadItemIndicadores | undefined> {
    return await this.save(cidXPtaNovoPadItemIndicadores);
  }

  async delete(cidXPtaNovoPadItemIndicadores: CidXPtaNovoPadItemIndicadores): Promise<CidXPtaNovoPadItemIndicadores | undefined> {
    return await this.cidXPtaNovoPadItemIndicadoresRepository.remove(cidXPtaNovoPadItemIndicadores);
  }
}

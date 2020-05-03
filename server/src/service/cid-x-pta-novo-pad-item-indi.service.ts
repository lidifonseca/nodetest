import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import CidXPtaNovoPadItemIndi from '../domain/cid-x-pta-novo-pad-item-indi.entity';
import { CidXPtaNovoPadItemIndiRepository } from '../repository/cid-x-pta-novo-pad-item-indi.repository';

const relationshipNames = [];
relationshipNames.push('padItemIndicadoresId');
relationshipNames.push('categoriasId');
relationshipNames.push('cidXPtaNovoId');

@Injectable()
export class CidXPtaNovoPadItemIndiService {
  logger = new Logger('CidXPtaNovoPadItemIndiService');

  constructor(
    @InjectRepository(CidXPtaNovoPadItemIndiRepository) private cidXPtaNovoPadItemIndiRepository: CidXPtaNovoPadItemIndiRepository
  ) {}

  async findById(id: string): Promise<CidXPtaNovoPadItemIndi | undefined> {
    const options = { relations: relationshipNames };
    return await this.cidXPtaNovoPadItemIndiRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<CidXPtaNovoPadItemIndi>): Promise<CidXPtaNovoPadItemIndi | undefined> {
    return await this.cidXPtaNovoPadItemIndiRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<CidXPtaNovoPadItemIndi>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[CidXPtaNovoPadItemIndi[], number]> {
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
          where += ' `CidXPtaNovoPadItemIndi`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `CidXPtaNovoPadItemIndi`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.cidXPtaNovoPadItemIndiRepository.findAndCount(options);
  }

  async save(cidXPtaNovoPadItemIndi: CidXPtaNovoPadItemIndi): Promise<CidXPtaNovoPadItemIndi | undefined> {
    return await this.cidXPtaNovoPadItemIndiRepository.save(cidXPtaNovoPadItemIndi);
  }

  async update(cidXPtaNovoPadItemIndi: CidXPtaNovoPadItemIndi): Promise<CidXPtaNovoPadItemIndi | undefined> {
    return await this.save(cidXPtaNovoPadItemIndi);
  }

  async delete(cidXPtaNovoPadItemIndi: CidXPtaNovoPadItemIndi): Promise<CidXPtaNovoPadItemIndi | undefined> {
    return await this.cidXPtaNovoPadItemIndiRepository.remove(cidXPtaNovoPadItemIndi);
  }
}

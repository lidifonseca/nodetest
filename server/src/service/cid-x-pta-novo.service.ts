import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import CidXPtaNovo from '../domain/cid-x-pta-novo.entity';
import { CidXPtaNovoRepository } from '../repository/cid-x-pta-novo.repository';

const relationshipNames = [];
relationshipNames.push('cid');

@Injectable()
export class CidXPtaNovoService {
  logger = new Logger('CidXPtaNovoService');

  constructor(@InjectRepository(CidXPtaNovoRepository) private cidXPtaNovoRepository: CidXPtaNovoRepository) {}

  async findById(id: string): Promise<CidXPtaNovo | undefined> {
    const options = { relations: relationshipNames };
    return await this.cidXPtaNovoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<CidXPtaNovo>): Promise<CidXPtaNovo | undefined> {
    return await this.cidXPtaNovoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<CidXPtaNovo>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[CidXPtaNovo[], number]> {
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
    return await this.cidXPtaNovoRepository.findAndCount(options);
  }

  async save(cidXPtaNovo: CidXPtaNovo): Promise<CidXPtaNovo | undefined> {
    return await this.cidXPtaNovoRepository.save(cidXPtaNovo);
  }

  async update(cidXPtaNovo: CidXPtaNovo): Promise<CidXPtaNovo | undefined> {
    return await this.save(cidXPtaNovo);
  }

  async delete(cidXPtaNovo: CidXPtaNovo): Promise<CidXPtaNovo | undefined> {
    return await this.cidXPtaNovoRepository.remove(cidXPtaNovo);
  }
}

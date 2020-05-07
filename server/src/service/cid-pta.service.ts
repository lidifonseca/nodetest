import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import CidPta from '../domain/cid-pta.entity';
import { CidPtaRepository } from '../repository/cid-pta.repository';

const relationshipNames = [];

@Injectable()
export class CidPtaService {
  logger = new Logger('CidPtaService');

  constructor(@InjectRepository(CidPtaRepository) private cidPtaRepository: CidPtaRepository) {}

  async findById(id: string): Promise<CidPta | undefined> {
    const options = { relations: relationshipNames };
    return await this.cidPtaRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<CidPta>): Promise<CidPta | undefined> {
    return await this.cidPtaRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<CidPta>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[CidPta[], number]> {
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
    return await this.cidPtaRepository.findAndCount(options);
  }

  async save(cidPta: CidPta): Promise<CidPta | undefined> {
    return await this.cidPtaRepository.save(cidPta);
  }

  async update(cidPta: CidPta): Promise<CidPta | undefined> {
    return await this.save(cidPta);
  }

  async delete(cidPta: CidPta): Promise<CidPta | undefined> {
    return await this.cidPtaRepository.remove(cidPta);
  }
}

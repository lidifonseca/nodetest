import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import Cid from '../domain/cid.entity';
import { CidRepository } from '../repository/cid.repository';

const relationshipNames = [];

@Injectable()
export class CidService {
  logger = new Logger('CidService');

  constructor(@InjectRepository(CidRepository) private cidRepository: CidRepository) {}

  async findById(id: string): Promise<Cid | undefined> {
    const options = { relations: relationshipNames };
    return await this.cidRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Cid>): Promise<Cid | undefined> {
    return await this.cidRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<Cid>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[Cid[], number]> {
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
    return await this.cidRepository.findAndCount(options);
  }

  async save(cid: Cid): Promise<Cid | undefined> {
    return await this.cidRepository.save(cid);
  }

  async update(cid: Cid): Promise<Cid | undefined> {
    return await this.save(cid);
  }

  async delete(cid: Cid): Promise<Cid | undefined> {
    return await this.cidRepository.remove(cid);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import PadCid from '../domain/pad-cid.entity';
import { PadCidRepository } from '../repository/pad-cid.repository';

const relationshipNames = [];
relationshipNames.push('pad');
relationshipNames.push('cid');

@Injectable()
export class PadCidService {
  logger = new Logger('PadCidService');

  constructor(@InjectRepository(PadCidRepository) private padCidRepository: PadCidRepository) {}

  async findById(id: string): Promise<PadCid | undefined> {
    const options = { relations: relationshipNames };
    return await this.padCidRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PadCid>): Promise<PadCid | undefined> {
    return await this.padCidRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<PadCid>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[PadCid[], number]> {
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
    return await this.padCidRepository.findAndCount(options);
  }

  async save(padCid: PadCid): Promise<PadCid | undefined> {
    return await this.padCidRepository.save(padCid);
  }

  async update(padCid: PadCid): Promise<PadCid | undefined> {
    return await this.save(padCid);
  }

  async delete(padCid: PadCid): Promise<PadCid | undefined> {
    return await this.padCidRepository.remove(padCid);
  }
}

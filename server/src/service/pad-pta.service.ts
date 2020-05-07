import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import PadPta from '../domain/pad-pta.entity';
import { PadPtaRepository } from '../repository/pad-pta.repository';

const relationshipNames = [];

@Injectable()
export class PadPtaService {
  logger = new Logger('PadPtaService');

  constructor(@InjectRepository(PadPtaRepository) private padPtaRepository: PadPtaRepository) {}

  async findById(id: string): Promise<PadPta | undefined> {
    const options = { relations: relationshipNames };
    return await this.padPtaRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PadPta>): Promise<PadPta | undefined> {
    return await this.padPtaRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<PadPta>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[PadPta[], number]> {
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
    return await this.padPtaRepository.findAndCount(options);
  }

  async save(padPta: PadPta): Promise<PadPta | undefined> {
    return await this.padPtaRepository.save(padPta);
  }

  async update(padPta: PadPta): Promise<PadPta | undefined> {
    return await this.save(padPta);
  }

  async delete(padPta: PadPta): Promise<PadPta | undefined> {
    return await this.padPtaRepository.remove(padPta);
  }
}

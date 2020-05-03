import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
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
          where += ' `PadPta`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `PadPta`.`' + element['column'] + '` = "' + element['value'] + '" ';
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

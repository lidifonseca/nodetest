import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import Pad from '../domain/pad.entity';
import { PadRepository } from '../repository/pad.repository';

const relationshipNames = [];
relationshipNames.push('unidade');
relationshipNames.push('operadora');
relationshipNames.push('franquia');
relationshipNames.push('paciente');

@Injectable()
export class PadService {
  logger = new Logger('PadService');

  constructor(@InjectRepository(PadRepository) private padRepository: PadRepository) {}

  async findById(id: string): Promise<Pad | undefined> {
    const options = { relations: relationshipNames };
    return await this.padRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Pad>): Promise<Pad | undefined> {
    return await this.padRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<Pad>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[Pad[], number]> {
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
    return await this.padRepository.findAndCount(options);
  }

  async save(pad: Pad): Promise<Pad | undefined> {
    return await this.padRepository.save(pad);
  }

  async update(pad: Pad): Promise<Pad | undefined> {
    return await this.save(pad);
  }

  async delete(pad: Pad): Promise<Pad | undefined> {
    return await this.padRepository.remove(pad);
  }
}

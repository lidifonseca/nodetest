import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import PadItemAlerta from '../domain/pad-item-alerta.entity';
import { PadItemAlertaRepository } from '../repository/pad-item-alerta.repository';

const relationshipNames = [];

@Injectable()
export class PadItemAlertaService {
  logger = new Logger('PadItemAlertaService');

  constructor(@InjectRepository(PadItemAlertaRepository) private padItemAlertaRepository: PadItemAlertaRepository) {}

  async findById(id: string): Promise<PadItemAlerta | undefined> {
    const options = { relations: relationshipNames };
    return await this.padItemAlertaRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PadItemAlerta>): Promise<PadItemAlerta | undefined> {
    return await this.padItemAlertaRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<PadItemAlerta>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[PadItemAlerta[], number]> {
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
    return await this.padItemAlertaRepository.findAndCount(options);
  }

  async save(padItemAlerta: PadItemAlerta): Promise<PadItemAlerta | undefined> {
    return await this.padItemAlertaRepository.save(padItemAlerta);
  }

  async update(padItemAlerta: PadItemAlerta): Promise<PadItemAlerta | undefined> {
    return await this.save(padItemAlerta);
  }

  async delete(padItemAlerta: PadItemAlerta): Promise<PadItemAlerta | undefined> {
    return await this.padItemAlertaRepository.remove(padItemAlerta);
  }
}

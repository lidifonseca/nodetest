import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import PadItemResultado from '../domain/pad-item-resultado.entity';
import { PadItemResultadoRepository } from '../repository/pad-item-resultado.repository';

const relationshipNames = [];
relationshipNames.push('idPadItem');

@Injectable()
export class PadItemResultadoService {
  logger = new Logger('PadItemResultadoService');

  constructor(@InjectRepository(PadItemResultadoRepository) private padItemResultadoRepository: PadItemResultadoRepository) {}

  async findById(id: string): Promise<PadItemResultado | undefined> {
    const options = { relations: relationshipNames };
    return await this.padItemResultadoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PadItemResultado>): Promise<PadItemResultado | undefined> {
    return await this.padItemResultadoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<PadItemResultado>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[PadItemResultado[], number]> {
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
    return await this.padItemResultadoRepository.findAndCount(options);
  }

  async save(padItemResultado: PadItemResultado): Promise<PadItemResultado | undefined> {
    return await this.padItemResultadoRepository.save(padItemResultado);
  }

  async update(padItemResultado: PadItemResultado): Promise<PadItemResultado | undefined> {
    return await this.save(padItemResultado);
  }

  async delete(padItemResultado: PadItemResultado): Promise<PadItemResultado | undefined> {
    return await this.padItemResultadoRepository.remove(padItemResultado);
  }
}

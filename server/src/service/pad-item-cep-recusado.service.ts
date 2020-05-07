import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import PadItemCepRecusado from '../domain/pad-item-cep-recusado.entity';
import { PadItemCepRecusadoRepository } from '../repository/pad-item-cep-recusado.repository';

const relationshipNames = [];

@Injectable()
export class PadItemCepRecusadoService {
  logger = new Logger('PadItemCepRecusadoService');

  constructor(@InjectRepository(PadItemCepRecusadoRepository) private padItemCepRecusadoRepository: PadItemCepRecusadoRepository) {}

  async findById(id: string): Promise<PadItemCepRecusado | undefined> {
    const options = { relations: relationshipNames };
    return await this.padItemCepRecusadoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PadItemCepRecusado>): Promise<PadItemCepRecusado | undefined> {
    return await this.padItemCepRecusadoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<PadItemCepRecusado>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[PadItemCepRecusado[], number]> {
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
    return await this.padItemCepRecusadoRepository.findAndCount(options);
  }

  async save(padItemCepRecusado: PadItemCepRecusado): Promise<PadItemCepRecusado | undefined> {
    return await this.padItemCepRecusadoRepository.save(padItemCepRecusado);
  }

  async update(padItemCepRecusado: PadItemCepRecusado): Promise<PadItemCepRecusado | undefined> {
    return await this.save(padItemCepRecusado);
  }

  async delete(padItemCepRecusado: PadItemCepRecusado): Promise<PadItemCepRecusado | undefined> {
    return await this.padItemCepRecusadoRepository.remove(padItemCepRecusado);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import PadItemCepRecusado from '../domain/pad-item-cep-recusado.entity';
import { PadItemCepRecusadoRepository } from '../repository/pad-item-cep-recusado.repository';

const relationshipNames = [];
relationshipNames.push('idPadItem');

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
          where += ' `PadItemCepRecusado`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `PadItemCepRecusado`.`' + element['column'] + '` = "' + element['value'] + '" ';
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

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import CepbrEstado from '../domain/cepbr-estado.entity';
import { CepbrEstadoRepository } from '../repository/cepbr-estado.repository';

const relationshipNames = [];

@Injectable()
export class CepbrEstadoService {
  logger = new Logger('CepbrEstadoService');

  constructor(@InjectRepository(CepbrEstadoRepository) private cepbrEstadoRepository: CepbrEstadoRepository) {}

  async findById(id: string): Promise<CepbrEstado | undefined> {
    const options = { relations: relationshipNames };
    return await this.cepbrEstadoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<CepbrEstado>): Promise<CepbrEstado | undefined> {
    return await this.cepbrEstadoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<CepbrEstado>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[CepbrEstado[], number]> {
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
          where += ' `CepbrEstado`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `CepbrEstado`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.cepbrEstadoRepository.findAndCount(options);
  }

  async save(cepbrEstado: CepbrEstado): Promise<CepbrEstado | undefined> {
    return await this.cepbrEstadoRepository.save(cepbrEstado);
  }

  async update(cepbrEstado: CepbrEstado): Promise<CepbrEstado | undefined> {
    return await this.save(cepbrEstado);
  }

  async delete(cepbrEstado: CepbrEstado): Promise<CepbrEstado | undefined> {
    return await this.cepbrEstadoRepository.remove(cepbrEstado);
  }
}

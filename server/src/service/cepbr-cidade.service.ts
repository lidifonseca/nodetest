import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import CepbrCidade from '../domain/cepbr-cidade.entity';
import { CepbrCidadeRepository } from '../repository/cepbr-cidade.repository';

const relationshipNames = [];
relationshipNames.push('uf');

@Injectable()
export class CepbrCidadeService {
  logger = new Logger('CepbrCidadeService');

  constructor(@InjectRepository(CepbrCidadeRepository) private cepbrCidadeRepository: CepbrCidadeRepository) {}

  async findById(id: string): Promise<CepbrCidade | undefined> {
    const options = { relations: relationshipNames };
    return await this.cepbrCidadeRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<CepbrCidade>): Promise<CepbrCidade | undefined> {
    return await this.cepbrCidadeRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<CepbrCidade>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[CepbrCidade[], number]> {
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
          where += ' `CepbrCidade`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `CepbrCidade`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.cepbrCidadeRepository.findAndCount(options);
  }

  async save(cepbrCidade: CepbrCidade): Promise<CepbrCidade | undefined> {
    return await this.cepbrCidadeRepository.save(cepbrCidade);
  }

  async update(cepbrCidade: CepbrCidade): Promise<CepbrCidade | undefined> {
    return await this.save(cepbrCidade);
  }

  async delete(cepbrCidade: CepbrCidade): Promise<CepbrCidade | undefined> {
    return await this.cepbrCidadeRepository.remove(cepbrCidade);
  }
}

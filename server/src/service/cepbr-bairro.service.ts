import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import CepbrBairro from '../domain/cepbr-bairro.entity';
import { CepbrBairroRepository } from '../repository/cepbr-bairro.repository';

const relationshipNames = [];

@Injectable()
export class CepbrBairroService {
  logger = new Logger('CepbrBairroService');

  constructor(@InjectRepository(CepbrBairroRepository) private cepbrBairroRepository: CepbrBairroRepository) {}

  async findById(id: string): Promise<CepbrBairro | undefined> {
    const options = { relations: relationshipNames };
    return await this.cepbrBairroRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<CepbrBairro>): Promise<CepbrBairro | undefined> {
    return await this.cepbrBairroRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<CepbrBairro>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[CepbrBairro[], number]> {
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
    return await this.cepbrBairroRepository.findAndCount(options);
  }

  async save(cepbrBairro: CepbrBairro): Promise<CepbrBairro | undefined> {
    return await this.cepbrBairroRepository.save(cepbrBairro);
  }

  async update(cepbrBairro: CepbrBairro): Promise<CepbrBairro | undefined> {
    return await this.save(cepbrBairro);
  }

  async delete(cepbrBairro: CepbrBairro): Promise<CepbrBairro | undefined> {
    return await this.cepbrBairroRepository.remove(cepbrBairro);
  }
}

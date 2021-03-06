import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import CepbrEndereco from '../domain/cepbr-endereco.entity';
import { CepbrEnderecoRepository } from '../repository/cepbr-endereco.repository';

const relationshipNames = [];

@Injectable()
export class CepbrEnderecoService {
  logger = new Logger('CepbrEnderecoService');

  constructor(@InjectRepository(CepbrEnderecoRepository) private cepbrEnderecoRepository: CepbrEnderecoRepository) {}

  async findById(id: string): Promise<CepbrEndereco | undefined> {
    const options = { relations: relationshipNames };
    return await this.cepbrEnderecoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<CepbrEndereco>): Promise<CepbrEndereco | undefined> {
    return await this.cepbrEnderecoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<CepbrEndereco>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[CepbrEndereco[], number]> {
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
    return await this.cepbrEnderecoRepository.findAndCount(options);
  }

  async save(cepbrEndereco: CepbrEndereco): Promise<CepbrEndereco | undefined> {
    return await this.cepbrEnderecoRepository.save(cepbrEndereco);
  }

  async update(cepbrEndereco: CepbrEndereco): Promise<CepbrEndereco | undefined> {
    return await this.save(cepbrEndereco);
  }

  async delete(cepbrEndereco: CepbrEndereco): Promise<CepbrEndereco | undefined> {
    return await this.cepbrEnderecoRepository.remove(cepbrEndereco);
  }
}

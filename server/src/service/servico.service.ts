import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import Servico from '../domain/servico.entity';
import { ServicoRepository } from '../repository/servico.repository';

const relationshipNames = [];

@Injectable()
export class ServicoService {
  logger = new Logger('ServicoService');

  constructor(@InjectRepository(ServicoRepository) private servicoRepository: ServicoRepository) {}

  async findById(id: string): Promise<Servico | undefined> {
    const options = { relations: relationshipNames };
    return await this.servicoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Servico>): Promise<Servico | undefined> {
    return await this.servicoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<Servico>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[Servico[], number]> {
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
    return await this.servicoRepository.findAndCount(options);
  }

  async save(servico: Servico): Promise<Servico | undefined> {
    return await this.servicoRepository.save(servico);
  }

  async update(servico: Servico): Promise<Servico | undefined> {
    return await this.save(servico);
  }

  async delete(servico: Servico): Promise<Servico | undefined> {
    return await this.servicoRepository.remove(servico);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import VwApiAtendimentosAceite from '../domain/vw-api-atendimentos-aceite.entity';
import { VwApiAtendimentosAceiteRepository } from '../repository/vw-api-atendimentos-aceite.repository';

const relationshipNames = [];

@Injectable()
export class VwApiAtendimentosAceiteService {
  logger = new Logger('VwApiAtendimentosAceiteService');

  constructor(
    @InjectRepository(VwApiAtendimentosAceiteRepository) private vwApiAtendimentosAceiteRepository: VwApiAtendimentosAceiteRepository
  ) {}

  async findById(id: string): Promise<VwApiAtendimentosAceite | undefined> {
    const options = { relations: relationshipNames };
    return await this.vwApiAtendimentosAceiteRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<VwApiAtendimentosAceite>): Promise<VwApiAtendimentosAceite | undefined> {
    return await this.vwApiAtendimentosAceiteRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<VwApiAtendimentosAceite>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[VwApiAtendimentosAceite[], number]> {
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
    return await this.vwApiAtendimentosAceiteRepository.findAndCount(options);
  }

  async save(vwApiAtendimentosAceite: VwApiAtendimentosAceite): Promise<VwApiAtendimentosAceite | undefined> {
    return await this.vwApiAtendimentosAceiteRepository.save(vwApiAtendimentosAceite);
  }

  async update(vwApiAtendimentosAceite: VwApiAtendimentosAceite): Promise<VwApiAtendimentosAceite | undefined> {
    return await this.save(vwApiAtendimentosAceite);
  }

  async delete(vwApiAtendimentosAceite: VwApiAtendimentosAceite): Promise<VwApiAtendimentosAceite | undefined> {
    return await this.vwApiAtendimentosAceiteRepository.remove(vwApiAtendimentosAceite);
  }
}

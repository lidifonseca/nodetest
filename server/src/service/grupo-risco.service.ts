import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import GrupoRisco from '../domain/grupo-risco.entity';
import { GrupoRiscoRepository } from '../repository/grupo-risco.repository';

const relationshipNames = [];

@Injectable()
export class GrupoRiscoService {
  logger = new Logger('GrupoRiscoService');

  constructor(@InjectRepository(GrupoRiscoRepository) private grupoRiscoRepository: GrupoRiscoRepository) {}

  async findById(id: string): Promise<GrupoRisco | undefined> {
    const options = { relations: relationshipNames };
    return await this.grupoRiscoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<GrupoRisco>): Promise<GrupoRisco | undefined> {
    return await this.grupoRiscoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<GrupoRisco>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[GrupoRisco[], number]> {
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
    return await this.grupoRiscoRepository.findAndCount(options);
  }

  async save(grupoRisco: GrupoRisco): Promise<GrupoRisco | undefined> {
    return await this.grupoRiscoRepository.save(grupoRisco);
  }

  async update(grupoRisco: GrupoRisco): Promise<GrupoRisco | undefined> {
    return await this.save(grupoRisco);
  }

  async delete(grupoRisco: GrupoRisco): Promise<GrupoRisco | undefined> {
    return await this.grupoRiscoRepository.remove(grupoRisco);
  }
}

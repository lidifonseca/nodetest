import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import Migracao from '../domain/migracao.entity';
import { MigracaoRepository } from '../repository/migracao.repository';

const relationshipNames = [];

@Injectable()
export class MigracaoService {
  logger = new Logger('MigracaoService');

  constructor(@InjectRepository(MigracaoRepository) private migracaoRepository: MigracaoRepository) {}

  async findById(id: string): Promise<Migracao | undefined> {
    const options = { relations: relationshipNames };
    return await this.migracaoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Migracao>): Promise<Migracao | undefined> {
    return await this.migracaoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<Migracao>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[Migracao[], number]> {
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
    return await this.migracaoRepository.findAndCount(options);
  }

  async save(migracao: Migracao): Promise<Migracao | undefined> {
    return await this.migracaoRepository.save(migracao);
  }

  async update(migracao: Migracao): Promise<Migracao | undefined> {
    return await this.save(migracao);
  }

  async delete(migracao: Migracao): Promise<Migracao | undefined> {
    return await this.migracaoRepository.remove(migracao);
  }
}

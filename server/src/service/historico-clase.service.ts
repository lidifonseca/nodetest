import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import HistoricoClase from '../domain/historico-clase.entity';
import { HistoricoClaseRepository } from '../repository/historico-clase.repository';

const relationshipNames = [];
relationshipNames.push('processo');

@Injectable()
export class HistoricoClaseService {
  logger = new Logger('HistoricoClaseService');

  constructor(@InjectRepository(HistoricoClaseRepository) private historicoClaseRepository: HistoricoClaseRepository) {}

  async findById(id: string): Promise<HistoricoClase | undefined> {
    const options = { relations: relationshipNames };
    return await this.historicoClaseRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<HistoricoClase>): Promise<HistoricoClase | undefined> {
    return await this.historicoClaseRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<HistoricoClase>): Promise<[HistoricoClase[], number]> {
    options.relations = relationshipNames;
    return await this.historicoClaseRepository.findAndCount(options);
  }

  async save(historicoClase: HistoricoClase): Promise<HistoricoClase | undefined> {
    return await this.historicoClaseRepository.save(historicoClase);
  }

  async update(historicoClase: HistoricoClase): Promise<HistoricoClase | undefined> {
    return await this.save(historicoClase);
  }

  async delete(historicoClase: HistoricoClase): Promise<HistoricoClase | undefined> {
    return await this.historicoClaseRepository.remove(historicoClase);
  }
}

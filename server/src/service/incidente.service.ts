import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Incidente from '../domain/incidente.entity';
import { IncidenteRepository } from '../repository/incidente.repository';

const relationshipNames = [];
relationshipNames.push('processo');

@Injectable()
export class IncidenteService {
  logger = new Logger('IncidenteService');

  constructor(@InjectRepository(IncidenteRepository) private incidenteRepository: IncidenteRepository) {}

  async findById(id: string): Promise<Incidente | undefined> {
    const options = { relations: relationshipNames };
    return await this.incidenteRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Incidente>): Promise<Incidente | undefined> {
    return await this.incidenteRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<Incidente>): Promise<[Incidente[], number]> {
    options.relations = relationshipNames;
    return await this.incidenteRepository.findAndCount(options);
  }

  async save(incidente: Incidente): Promise<Incidente | undefined> {
    return await this.incidenteRepository.save(incidente);
  }

  async update(incidente: Incidente): Promise<Incidente | undefined> {
    return await this.save(incidente);
  }

  async delete(incidente: Incidente): Promise<Incidente | undefined> {
    return await this.incidenteRepository.remove(incidente);
  }
}

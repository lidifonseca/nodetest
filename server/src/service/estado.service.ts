import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Estado from '../domain/estado.entity';
import { EstadoRepository } from '../repository/estado.repository';

const relationshipNames = [];

@Injectable()
export class EstadoService {
  logger = new Logger('EstadoService');

  constructor(@InjectRepository(EstadoRepository) private estadoRepository: EstadoRepository) {}

  async findById(id: string): Promise<Estado | undefined> {
    const options = { relations: relationshipNames };
    return await this.estadoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Estado>): Promise<Estado | undefined> {
    return await this.estadoRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<Estado>): Promise<[Estado[], number]> {
    options.relations = relationshipNames;
    return await this.estadoRepository.findAndCount(options);
  }

  async save(estado: Estado): Promise<Estado | undefined> {
    return await this.estadoRepository.save(estado);
  }

  async update(estado: Estado): Promise<Estado | undefined> {
    return await this.save(estado);
  }

  async delete(estado: Estado): Promise<Estado | undefined> {
    return await this.estadoRepository.remove(estado);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Parte from '../domain/parte.entity';
import { ParteRepository } from '../repository/parte.repository';

const relationshipNames = [];
relationshipNames.push('processo');

@Injectable()
export class ParteService {
  logger = new Logger('ParteService');

  constructor(@InjectRepository(ParteRepository) private parteRepository: ParteRepository) {}

  async findById(id: string): Promise<Parte | undefined> {
    const options = { relations: relationshipNames };
    return await this.parteRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Parte>): Promise<Parte | undefined> {
    return await this.parteRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<Parte>): Promise<[Parte[], number]> {
    options.relations = relationshipNames;
    return await this.parteRepository.findAndCount(options);
  }

  async save(parte: Parte): Promise<Parte | undefined> {
    return await this.parteRepository.save(parte);
  }

  async update(parte: Parte): Promise<Parte | undefined> {
    return await this.save(parte);
  }

  async delete(parte: Parte): Promise<Parte | undefined> {
    return await this.parteRepository.remove(parte);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import Maio from '../domain/maio.entity';
import { MaioRepository } from '../repository/maio.repository';

const relationshipNames = [];

@Injectable()
export class MaioService {
  logger = new Logger('MaioService');

  constructor(@InjectRepository(MaioRepository) private maioRepository: MaioRepository) {}

  async findById(id: string): Promise<Maio | undefined> {
    const options = { relations: relationshipNames };
    return await this.maioRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Maio>): Promise<Maio | undefined> {
    return await this.maioRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<Maio>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[Maio[], number]> {
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
    return await this.maioRepository.findAndCount(options);
  }

  async save(maio: Maio): Promise<Maio | undefined> {
    return await this.maioRepository.save(maio);
  }

  async update(maio: Maio): Promise<Maio | undefined> {
    return await this.save(maio);
  }

  async delete(maio: Maio): Promise<Maio | undefined> {
    return await this.maioRepository.remove(maio);
  }
}

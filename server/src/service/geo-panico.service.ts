import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import GeoPanico from '../domain/geo-panico.entity';
import { GeoPanicoRepository } from '../repository/geo-panico.repository';

const relationshipNames = [];

@Injectable()
export class GeoPanicoService {
  logger = new Logger('GeoPanicoService');

  constructor(@InjectRepository(GeoPanicoRepository) private geoPanicoRepository: GeoPanicoRepository) {}

  async findById(id: string): Promise<GeoPanico | undefined> {
    const options = { relations: relationshipNames };
    return await this.geoPanicoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<GeoPanico>): Promise<GeoPanico | undefined> {
    return await this.geoPanicoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<GeoPanico>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[GeoPanico[], number]> {
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
    return await this.geoPanicoRepository.findAndCount(options);
  }

  async save(geoPanico: GeoPanico): Promise<GeoPanico | undefined> {
    return await this.geoPanicoRepository.save(geoPanico);
  }

  async update(geoPanico: GeoPanico): Promise<GeoPanico | undefined> {
    return await this.save(geoPanico);
  }

  async delete(geoPanico: GeoPanico): Promise<GeoPanico | undefined> {
    return await this.geoPanicoRepository.remove(geoPanico);
  }
}

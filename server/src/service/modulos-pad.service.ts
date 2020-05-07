import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import ModulosPad from '../domain/modulos-pad.entity';
import { ModulosPadRepository } from '../repository/modulos-pad.repository';

const relationshipNames = [];

@Injectable()
export class ModulosPadService {
  logger = new Logger('ModulosPadService');

  constructor(@InjectRepository(ModulosPadRepository) private modulosPadRepository: ModulosPadRepository) {}

  async findById(id: string): Promise<ModulosPad | undefined> {
    const options = { relations: relationshipNames };
    return await this.modulosPadRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<ModulosPad>): Promise<ModulosPad | undefined> {
    return await this.modulosPadRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<ModulosPad>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[ModulosPad[], number]> {
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
    return await this.modulosPadRepository.findAndCount(options);
  }

  async save(modulosPad: ModulosPad): Promise<ModulosPad | undefined> {
    return await this.modulosPadRepository.save(modulosPad);
  }

  async update(modulosPad: ModulosPad): Promise<ModulosPad | undefined> {
    return await this.save(modulosPad);
  }

  async delete(modulosPad: ModulosPad): Promise<ModulosPad | undefined> {
    return await this.modulosPadRepository.remove(modulosPad);
  }
}

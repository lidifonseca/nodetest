import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import ModulosPadConfig from '../domain/modulos-pad-config.entity';
import { ModulosPadConfigRepository } from '../repository/modulos-pad-config.repository';

const relationshipNames = [];

@Injectable()
export class ModulosPadConfigService {
  logger = new Logger('ModulosPadConfigService');

  constructor(@InjectRepository(ModulosPadConfigRepository) private modulosPadConfigRepository: ModulosPadConfigRepository) {}

  async findById(id: string): Promise<ModulosPadConfig | undefined> {
    const options = { relations: relationshipNames };
    return await this.modulosPadConfigRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<ModulosPadConfig>): Promise<ModulosPadConfig | undefined> {
    return await this.modulosPadConfigRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<ModulosPadConfig>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[ModulosPadConfig[], number]> {
    options.relations = relationshipNames;
    let where = '';
    let first = true;
    for (const i in filters) {
      if (filters.hasOwnProperty(i)) {
        const element = filters[i];
        if (!first) {
          where += 'and';
        } else {
          first = false;
        }
        if (element['operation'] === 'contains') {
          where += ' `ModulosPadConfig`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `ModulosPadConfig`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.modulosPadConfigRepository.findAndCount(options);
  }

  async save(modulosPadConfig: ModulosPadConfig): Promise<ModulosPadConfig | undefined> {
    return await this.modulosPadConfigRepository.save(modulosPadConfig);
  }

  async update(modulosPadConfig: ModulosPadConfig): Promise<ModulosPadConfig | undefined> {
    return await this.save(modulosPadConfig);
  }

  async delete(modulosPadConfig: ModulosPadConfig): Promise<ModulosPadConfig | undefined> {
    return await this.modulosPadConfigRepository.remove(modulosPadConfig);
  }
}

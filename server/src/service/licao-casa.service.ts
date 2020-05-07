import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import LicaoCasa from '../domain/licao-casa.entity';
import { LicaoCasaRepository } from '../repository/licao-casa.repository';

const relationshipNames = [];

@Injectable()
export class LicaoCasaService {
  logger = new Logger('LicaoCasaService');

  constructor(@InjectRepository(LicaoCasaRepository) private licaoCasaRepository: LicaoCasaRepository) {}

  async findById(id: string): Promise<LicaoCasa | undefined> {
    const options = { relations: relationshipNames };
    return await this.licaoCasaRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<LicaoCasa>): Promise<LicaoCasa | undefined> {
    return await this.licaoCasaRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<LicaoCasa>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[LicaoCasa[], number]> {
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
    return await this.licaoCasaRepository.findAndCount(options);
  }

  async save(licaoCasa: LicaoCasa): Promise<LicaoCasa | undefined> {
    return await this.licaoCasaRepository.save(licaoCasa);
  }

  async update(licaoCasa: LicaoCasa): Promise<LicaoCasa | undefined> {
    return await this.save(licaoCasa);
  }

  async delete(licaoCasa: LicaoCasa): Promise<LicaoCasa | undefined> {
    return await this.licaoCasaRepository.remove(licaoCasa);
  }
}

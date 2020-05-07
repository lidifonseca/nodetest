import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import CategoriaContrato from '../domain/categoria-contrato.entity';
import { CategoriaContratoRepository } from '../repository/categoria-contrato.repository';

const relationshipNames = [];

@Injectable()
export class CategoriaContratoService {
  logger = new Logger('CategoriaContratoService');

  constructor(@InjectRepository(CategoriaContratoRepository) private categoriaContratoRepository: CategoriaContratoRepository) {}

  async findById(id: string): Promise<CategoriaContrato | undefined> {
    const options = { relations: relationshipNames };
    return await this.categoriaContratoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<CategoriaContrato>): Promise<CategoriaContrato | undefined> {
    return await this.categoriaContratoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<CategoriaContrato>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[CategoriaContrato[], number]> {
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
    return await this.categoriaContratoRepository.findAndCount(options);
  }

  async save(categoriaContrato: CategoriaContrato): Promise<CategoriaContrato | undefined> {
    return await this.categoriaContratoRepository.save(categoriaContrato);
  }

  async update(categoriaContrato: CategoriaContrato): Promise<CategoriaContrato | undefined> {
    return await this.save(categoriaContrato);
  }

  async delete(categoriaContrato: CategoriaContrato): Promise<CategoriaContrato | undefined> {
    return await this.categoriaContratoRepository.remove(categoriaContrato);
  }
}

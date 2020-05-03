import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import CategoriaContrato from '../domain/categoria-contrato.entity';
import { CategoriaContratoRepository } from '../repository/categoria-contrato.repository';

const relationshipNames = [];
relationshipNames.push('idCategoria');

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
          where += ' `CategoriaContrato`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `CategoriaContrato`.`' + element['column'] + '` = "' + element['value'] + '" ';
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

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Categoria from '../domain/categoria.entity';
import { CategoriaRepository } from '../repository/categoria.repository';

const relationshipNames = [];

@Injectable()
export class CategoriaService {
  logger = new Logger('CategoriaService');

  constructor(@InjectRepository(CategoriaRepository) private categoriaRepository: CategoriaRepository) {}

  async findById(id: string): Promise<Categoria | undefined> {
    const options = { relations: relationshipNames };
    return await this.categoriaRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Categoria>): Promise<Categoria | undefined> {
    return await this.categoriaRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<Categoria>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[Categoria[], number]> {
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
          where += ' `Categoria`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `Categoria`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.categoriaRepository.findAndCount(options);
  }

  async save(categoria: Categoria): Promise<Categoria | undefined> {
    return await this.categoriaRepository.save(categoria);
  }

  async update(categoria: Categoria): Promise<Categoria | undefined> {
    return await this.save(categoria);
  }

  async delete(categoria: Categoria): Promise<Categoria | undefined> {
    return await this.categoriaRepository.remove(categoria);
  }
}

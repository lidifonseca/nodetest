import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import Categoria from '../domain/categoria.entity';
import { CategoriaRepository } from '../repository/categoria.repository';

const relationshipNames = [];
relationshipNames.push('unidades');

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

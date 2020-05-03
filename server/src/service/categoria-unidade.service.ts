import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import CategoriaUnidade from '../domain/categoria-unidade.entity';
import { CategoriaUnidadeRepository } from '../repository/categoria-unidade.repository';

const relationshipNames = [];
relationshipNames.push('unidade');
relationshipNames.push('idCategoria');

@Injectable()
export class CategoriaUnidadeService {
  logger = new Logger('CategoriaUnidadeService');

  constructor(@InjectRepository(CategoriaUnidadeRepository) private categoriaUnidadeRepository: CategoriaUnidadeRepository) {}

  async findById(id: string): Promise<CategoriaUnidade | undefined> {
    const options = { relations: relationshipNames };
    return await this.categoriaUnidadeRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<CategoriaUnidade>): Promise<CategoriaUnidade | undefined> {
    return await this.categoriaUnidadeRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<CategoriaUnidade>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[CategoriaUnidade[], number]> {
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
    return await this.categoriaUnidadeRepository.findAndCount(options);
  }

  async save(categoriaUnidade: CategoriaUnidade): Promise<CategoriaUnidade | undefined> {
    return await this.categoriaUnidadeRepository.save(categoriaUnidade);
  }

  async update(categoriaUnidade: CategoriaUnidade): Promise<CategoriaUnidade | undefined> {
    return await this.save(categoriaUnidade);
  }

  async delete(categoriaUnidade: CategoriaUnidade): Promise<CategoriaUnidade | undefined> {
    return await this.categoriaUnidadeRepository.remove(categoriaUnidade);
  }
}

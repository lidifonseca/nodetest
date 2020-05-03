import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import CategoriaAtividade from '../domain/categoria-atividade.entity';
import { CategoriaAtividadeRepository } from '../repository/categoria-atividade.repository';

const relationshipNames = [];
relationshipNames.push('idCategoria');

@Injectable()
export class CategoriaAtividadeService {
  logger = new Logger('CategoriaAtividadeService');

  constructor(@InjectRepository(CategoriaAtividadeRepository) private categoriaAtividadeRepository: CategoriaAtividadeRepository) {}

  async findById(id: string): Promise<CategoriaAtividade | undefined> {
    const options = { relations: relationshipNames };
    return await this.categoriaAtividadeRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<CategoriaAtividade>): Promise<CategoriaAtividade | undefined> {
    return await this.categoriaAtividadeRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<CategoriaAtividade>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[CategoriaAtividade[], number]> {
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
          where += ' `CategoriaAtividade`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `CategoriaAtividade`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.categoriaAtividadeRepository.findAndCount(options);
  }

  async save(categoriaAtividade: CategoriaAtividade): Promise<CategoriaAtividade | undefined> {
    return await this.categoriaAtividadeRepository.save(categoriaAtividade);
  }

  async update(categoriaAtividade: CategoriaAtividade): Promise<CategoriaAtividade | undefined> {
    return await this.save(categoriaAtividade);
  }

  async delete(categoriaAtividade: CategoriaAtividade): Promise<CategoriaAtividade | undefined> {
    return await this.categoriaAtividadeRepository.remove(categoriaAtividade);
  }
}

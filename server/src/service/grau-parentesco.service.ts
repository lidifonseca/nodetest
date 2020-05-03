import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import GrauParentesco from '../domain/grau-parentesco.entity';
import { GrauParentescoRepository } from '../repository/grau-parentesco.repository';

const relationshipNames = [];

@Injectable()
export class GrauParentescoService {
  logger = new Logger('GrauParentescoService');

  constructor(@InjectRepository(GrauParentescoRepository) private grauParentescoRepository: GrauParentescoRepository) {}

  async findById(id: string): Promise<GrauParentesco | undefined> {
    const options = { relations: relationshipNames };
    return await this.grauParentescoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<GrauParentesco>): Promise<GrauParentesco | undefined> {
    return await this.grauParentescoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<GrauParentesco>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[GrauParentesco[], number]> {
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
          where += ' `GrauParentesco`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `GrauParentesco`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.grauParentescoRepository.findAndCount(options);
  }

  async save(grauParentesco: GrauParentesco): Promise<GrauParentesco | undefined> {
    return await this.grauParentescoRepository.save(grauParentesco);
  }

  async update(grauParentesco: GrauParentesco): Promise<GrauParentesco | undefined> {
    return await this.save(grauParentesco);
  }

  async delete(grauParentesco: GrauParentesco): Promise<GrauParentesco | undefined> {
    return await this.grauParentescoRepository.remove(grauParentesco);
  }
}

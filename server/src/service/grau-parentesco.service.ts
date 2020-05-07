import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
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

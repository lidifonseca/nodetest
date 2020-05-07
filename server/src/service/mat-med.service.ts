import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import MatMed from '../domain/mat-med.entity';
import { MatMedRepository } from '../repository/mat-med.repository';

const relationshipNames = [];

@Injectable()
export class MatMedService {
  logger = new Logger('MatMedService');

  constructor(@InjectRepository(MatMedRepository) private matMedRepository: MatMedRepository) {}

  async findById(id: string): Promise<MatMed | undefined> {
    const options = { relations: relationshipNames };
    return await this.matMedRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<MatMed>): Promise<MatMed | undefined> {
    return await this.matMedRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<MatMed>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[MatMed[], number]> {
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
    return await this.matMedRepository.findAndCount(options);
  }

  async save(matMed: MatMed): Promise<MatMed | undefined> {
    return await this.matMedRepository.save(matMed);
  }

  async update(matMed: MatMed): Promise<MatMed | undefined> {
    return await this.save(matMed);
  }

  async delete(matMed: MatMed): Promise<MatMed | undefined> {
    return await this.matMedRepository.remove(matMed);
  }
}

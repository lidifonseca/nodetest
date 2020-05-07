import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import ApiInput from '../domain/api-input.entity';
import { ApiInputRepository } from '../repository/api-input.repository';

const relationshipNames = [];

@Injectable()
export class ApiInputService {
  logger = new Logger('ApiInputService');

  constructor(@InjectRepository(ApiInputRepository) private apiInputRepository: ApiInputRepository) {}

  async findById(id: string): Promise<ApiInput | undefined> {
    const options = { relations: relationshipNames };
    return await this.apiInputRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<ApiInput>): Promise<ApiInput | undefined> {
    return await this.apiInputRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<ApiInput>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[ApiInput[], number]> {
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
    return await this.apiInputRepository.findAndCount(options);
  }

  async save(apiInput: ApiInput): Promise<ApiInput | undefined> {
    return await this.apiInputRepository.save(apiInput);
  }

  async update(apiInput: ApiInput): Promise<ApiInput | undefined> {
    return await this.save(apiInput);
  }

  async delete(apiInput: ApiInput): Promise<ApiInput | undefined> {
    return await this.apiInputRepository.remove(apiInput);
  }
}

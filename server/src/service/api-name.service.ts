import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import ApiName from '../domain/api-name.entity';
import { ApiNameRepository } from '../repository/api-name.repository';

const relationshipNames = [];

@Injectable()
export class ApiNameService {
  logger = new Logger('ApiNameService');

  constructor(@InjectRepository(ApiNameRepository) private apiNameRepository: ApiNameRepository) {}

  async findById(id: string): Promise<ApiName | undefined> {
    const options = { relations: relationshipNames };
    return await this.apiNameRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<ApiName>): Promise<ApiName | undefined> {
    return await this.apiNameRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<ApiName>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[ApiName[], number]> {
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
    return await this.apiNameRepository.findAndCount(options);
  }

  async save(apiName: ApiName): Promise<ApiName | undefined> {
    return await this.apiNameRepository.save(apiName);
  }

  async update(apiName: ApiName): Promise<ApiName | undefined> {
    return await this.save(apiName);
  }

  async delete(apiName: ApiName): Promise<ApiName | undefined> {
    return await this.apiNameRepository.remove(apiName);
  }
}

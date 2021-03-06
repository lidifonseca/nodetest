import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import ApiReturn from '../domain/api-return.entity';
import { ApiReturnRepository } from '../repository/api-return.repository';

const relationshipNames = [];

@Injectable()
export class ApiReturnService {
  logger = new Logger('ApiReturnService');

  constructor(@InjectRepository(ApiReturnRepository) private apiReturnRepository: ApiReturnRepository) {}

  async findById(id: string): Promise<ApiReturn | undefined> {
    const options = { relations: relationshipNames };
    return await this.apiReturnRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<ApiReturn>): Promise<ApiReturn | undefined> {
    return await this.apiReturnRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<ApiReturn>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[ApiReturn[], number]> {
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
    return await this.apiReturnRepository.findAndCount(options);
  }

  async save(apiReturn: ApiReturn): Promise<ApiReturn | undefined> {
    return await this.apiReturnRepository.save(apiReturn);
  }

  async update(apiReturn: ApiReturn): Promise<ApiReturn | undefined> {
    return await this.save(apiReturn);
  }

  async delete(apiReturn: ApiReturn): Promise<ApiReturn | undefined> {
    return await this.apiReturnRepository.remove(apiReturn);
  }
}

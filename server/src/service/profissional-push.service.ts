import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import ProfissionalPush from '../domain/profissional-push.entity';
import { ProfissionalPushRepository } from '../repository/profissional-push.repository';

const relationshipNames = [];

@Injectable()
export class ProfissionalPushService {
  logger = new Logger('ProfissionalPushService');

  constructor(@InjectRepository(ProfissionalPushRepository) private profissionalPushRepository: ProfissionalPushRepository) {}

  async findById(id: string): Promise<ProfissionalPush | undefined> {
    const options = { relations: relationshipNames };
    return await this.profissionalPushRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<ProfissionalPush>): Promise<ProfissionalPush | undefined> {
    return await this.profissionalPushRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<ProfissionalPush>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[ProfissionalPush[], number]> {
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
    return await this.profissionalPushRepository.findAndCount(options);
  }

  async save(profissionalPush: ProfissionalPush): Promise<ProfissionalPush | undefined> {
    return await this.profissionalPushRepository.save(profissionalPush);
  }

  async update(profissionalPush: ProfissionalPush): Promise<ProfissionalPush | undefined> {
    return await this.save(profissionalPush);
  }

  async delete(profissionalPush: ProfissionalPush): Promise<ProfissionalPush | undefined> {
    return await this.profissionalPushRepository.remove(profissionalPush);
  }
}

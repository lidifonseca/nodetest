import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import MotivoPs from '../domain/motivo-ps.entity';
import { MotivoPsRepository } from '../repository/motivo-ps.repository';

const relationshipNames = [];

@Injectable()
export class MotivoPsService {
  logger = new Logger('MotivoPsService');

  constructor(@InjectRepository(MotivoPsRepository) private motivoPsRepository: MotivoPsRepository) {}

  async findById(id: string): Promise<MotivoPs | undefined> {
    const options = { relations: relationshipNames };
    return await this.motivoPsRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<MotivoPs>): Promise<MotivoPs | undefined> {
    return await this.motivoPsRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<MotivoPs>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[MotivoPs[], number]> {
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
    return await this.motivoPsRepository.findAndCount(options);
  }

  async save(motivoPs: MotivoPs): Promise<MotivoPs | undefined> {
    return await this.motivoPsRepository.save(motivoPs);
  }

  async update(motivoPs: MotivoPs): Promise<MotivoPs | undefined> {
    return await this.save(motivoPs);
  }

  async delete(motivoPs: MotivoPs): Promise<MotivoPs | undefined> {
    return await this.motivoPsRepository.remove(motivoPs);
  }
}

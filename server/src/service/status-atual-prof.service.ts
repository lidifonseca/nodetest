import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import StatusAtualProf from '../domain/status-atual-prof.entity';
import { StatusAtualProfRepository } from '../repository/status-atual-prof.repository';

const relationshipNames = [];

@Injectable()
export class StatusAtualProfService {
  logger = new Logger('StatusAtualProfService');

  constructor(@InjectRepository(StatusAtualProfRepository) private statusAtualProfRepository: StatusAtualProfRepository) {}

  async findById(id: string): Promise<StatusAtualProf | undefined> {
    const options = { relations: relationshipNames };
    return await this.statusAtualProfRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<StatusAtualProf>): Promise<StatusAtualProf | undefined> {
    return await this.statusAtualProfRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<StatusAtualProf>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[StatusAtualProf[], number]> {
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
    return await this.statusAtualProfRepository.findAndCount(options);
  }

  async save(statusAtualProf: StatusAtualProf): Promise<StatusAtualProf | undefined> {
    return await this.statusAtualProfRepository.save(statusAtualProf);
  }

  async update(statusAtualProf: StatusAtualProf): Promise<StatusAtualProf | undefined> {
    return await this.save(statusAtualProf);
  }

  async delete(statusAtualProf: StatusAtualProf): Promise<StatusAtualProf | undefined> {
    return await this.statusAtualProfRepository.remove(statusAtualProf);
  }
}

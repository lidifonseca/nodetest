import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import Respostas from '../domain/respostas.entity';
import { RespostasRepository } from '../repository/respostas.repository';

const relationshipNames = [];

@Injectable()
export class RespostasService {
  logger = new Logger('RespostasService');

  constructor(@InjectRepository(RespostasRepository) private respostasRepository: RespostasRepository) {}

  async findById(id: string): Promise<Respostas | undefined> {
    const options = { relations: relationshipNames };
    return await this.respostasRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Respostas>): Promise<Respostas | undefined> {
    return await this.respostasRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<Respostas>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[Respostas[], number]> {
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
    return await this.respostasRepository.findAndCount(options);
  }

  async save(respostas: Respostas): Promise<Respostas | undefined> {
    return await this.respostasRepository.save(respostas);
  }

  async update(respostas: Respostas): Promise<Respostas | undefined> {
    return await this.save(respostas);
  }

  async delete(respostas: Respostas): Promise<Respostas | undefined> {
    return await this.respostasRepository.remove(respostas);
  }
}

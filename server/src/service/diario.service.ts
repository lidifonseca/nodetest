import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import Diario from '../domain/diario.entity';
import { DiarioRepository } from '../repository/diario.repository';

const relationshipNames = [];
relationshipNames.push('usuario');
relationshipNames.push('paciente');

@Injectable()
export class DiarioService {
  logger = new Logger('DiarioService');

  constructor(@InjectRepository(DiarioRepository) private diarioRepository: DiarioRepository) {}

  async findById(id: string): Promise<Diario | undefined> {
    const options = { relations: relationshipNames };
    return await this.diarioRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Diario>): Promise<Diario | undefined> {
    return await this.diarioRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<Diario>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[Diario[], number]> {
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
    return await this.diarioRepository.findAndCount(options);
  }

  async save(diario: Diario): Promise<Diario | undefined> {
    return await this.diarioRepository.save(diario);
  }

  async update(diario: Diario): Promise<Diario | undefined> {
    return await this.save(diario);
  }

  async delete(diario: Diario): Promise<Diario | undefined> {
    return await this.diarioRepository.remove(diario);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import TipoProntuario from '../domain/tipo-prontuario.entity';
import { TipoProntuarioRepository } from '../repository/tipo-prontuario.repository';

const relationshipNames = [];

@Injectable()
export class TipoProntuarioService {
  logger = new Logger('TipoProntuarioService');

  constructor(@InjectRepository(TipoProntuarioRepository) private tipoProntuarioRepository: TipoProntuarioRepository) {}

  async findById(id: string): Promise<TipoProntuario | undefined> {
    const options = { relations: relationshipNames };
    return await this.tipoProntuarioRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<TipoProntuario>): Promise<TipoProntuario | undefined> {
    return await this.tipoProntuarioRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<TipoProntuario>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[TipoProntuario[], number]> {
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
    return await this.tipoProntuarioRepository.findAndCount(options);
  }

  async save(tipoProntuario: TipoProntuario): Promise<TipoProntuario | undefined> {
    return await this.tipoProntuarioRepository.save(tipoProntuario);
  }

  async update(tipoProntuario: TipoProntuario): Promise<TipoProntuario | undefined> {
    return await this.save(tipoProntuario);
  }

  async delete(tipoProntuario: TipoProntuario): Promise<TipoProntuario | undefined> {
    return await this.tipoProntuarioRepository.remove(tipoProntuario);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import Protocolos from '../domain/protocolos.entity';
import { ProtocolosRepository } from '../repository/protocolos.repository';

const relationshipNames = [];

@Injectable()
export class ProtocolosService {
  logger = new Logger('ProtocolosService');

  constructor(@InjectRepository(ProtocolosRepository) private protocolosRepository: ProtocolosRepository) {}

  async findById(id: string): Promise<Protocolos | undefined> {
    const options = { relations: relationshipNames };
    return await this.protocolosRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Protocolos>): Promise<Protocolos | undefined> {
    return await this.protocolosRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<Protocolos>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[Protocolos[], number]> {
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
    return await this.protocolosRepository.findAndCount(options);
  }

  async save(protocolos: Protocolos): Promise<Protocolos | undefined> {
    return await this.protocolosRepository.save(protocolos);
  }

  async update(protocolos: Protocolos): Promise<Protocolos | undefined> {
    return await this.save(protocolos);
  }

  async delete(protocolos: Protocolos): Promise<Protocolos | undefined> {
    return await this.protocolosRepository.remove(protocolos);
  }
}

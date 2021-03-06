import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import MotivoInternacao from '../domain/motivo-internacao.entity';
import { MotivoInternacaoRepository } from '../repository/motivo-internacao.repository';

const relationshipNames = [];

@Injectable()
export class MotivoInternacaoService {
  logger = new Logger('MotivoInternacaoService');

  constructor(@InjectRepository(MotivoInternacaoRepository) private motivoInternacaoRepository: MotivoInternacaoRepository) {}

  async findById(id: string): Promise<MotivoInternacao | undefined> {
    const options = { relations: relationshipNames };
    return await this.motivoInternacaoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<MotivoInternacao>): Promise<MotivoInternacao | undefined> {
    return await this.motivoInternacaoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<MotivoInternacao>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[MotivoInternacao[], number]> {
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
    return await this.motivoInternacaoRepository.findAndCount(options);
  }

  async save(motivoInternacao: MotivoInternacao): Promise<MotivoInternacao | undefined> {
    return await this.motivoInternacaoRepository.save(motivoInternacao);
  }

  async update(motivoInternacao: MotivoInternacao): Promise<MotivoInternacao | undefined> {
    return await this.save(motivoInternacao);
  }

  async delete(motivoInternacao: MotivoInternacao): Promise<MotivoInternacao | undefined> {
    return await this.motivoInternacaoRepository.remove(motivoInternacao);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
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
    let where = '';
    let first = true;
    for (const i in filters) {
      if (filters.hasOwnProperty(i)) {
        const element = filters[i];
        if (!first) {
          where += 'and';
        } else {
          first = false;
        }
        if (element['operation'] === 'contains') {
          where += ' `MotivoInternacao`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `MotivoInternacao`.`' + element['column'] + '` = "' + element['value'] + '" ';
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

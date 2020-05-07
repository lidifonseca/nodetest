import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import PacienteMotivoInternacao from '../domain/paciente-motivo-internacao.entity';
import { PacienteMotivoInternacaoRepository } from '../repository/paciente-motivo-internacao.repository';

const relationshipNames = [];

@Injectable()
export class PacienteMotivoInternacaoService {
  logger = new Logger('PacienteMotivoInternacaoService');

  constructor(
    @InjectRepository(PacienteMotivoInternacaoRepository) private pacienteMotivoInternacaoRepository: PacienteMotivoInternacaoRepository
  ) {}

  async findById(id: string): Promise<PacienteMotivoInternacao | undefined> {
    const options = { relations: relationshipNames };
    return await this.pacienteMotivoInternacaoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PacienteMotivoInternacao>): Promise<PacienteMotivoInternacao | undefined> {
    return await this.pacienteMotivoInternacaoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<PacienteMotivoInternacao>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[PacienteMotivoInternacao[], number]> {
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
    return await this.pacienteMotivoInternacaoRepository.findAndCount(options);
  }

  async save(pacienteMotivoInternacao: PacienteMotivoInternacao): Promise<PacienteMotivoInternacao | undefined> {
    return await this.pacienteMotivoInternacaoRepository.save(pacienteMotivoInternacao);
  }

  async update(pacienteMotivoInternacao: PacienteMotivoInternacao): Promise<PacienteMotivoInternacao | undefined> {
    return await this.save(pacienteMotivoInternacao);
  }

  async delete(pacienteMotivoInternacao: PacienteMotivoInternacao): Promise<PacienteMotivoInternacao | undefined> {
    return await this.pacienteMotivoInternacaoRepository.remove(pacienteMotivoInternacao);
  }
}

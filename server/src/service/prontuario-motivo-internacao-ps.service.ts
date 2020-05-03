import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import ProntuarioMotivoInternacaoPs from '../domain/prontuario-motivo-internacao-ps.entity';
import { ProntuarioMotivoInternacaoPsRepository } from '../repository/prontuario-motivo-internacao-ps.repository';

const relationshipNames = [];

@Injectable()
export class ProntuarioMotivoInternacaoPsService {
  logger = new Logger('ProntuarioMotivoInternacaoPsService');

  constructor(
    @InjectRepository(ProntuarioMotivoInternacaoPsRepository)
    private prontuarioMotivoInternacaoPsRepository: ProntuarioMotivoInternacaoPsRepository
  ) {}

  async findById(id: string): Promise<ProntuarioMotivoInternacaoPs | undefined> {
    const options = { relations: relationshipNames };
    return await this.prontuarioMotivoInternacaoPsRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<ProntuarioMotivoInternacaoPs>): Promise<ProntuarioMotivoInternacaoPs | undefined> {
    return await this.prontuarioMotivoInternacaoPsRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<ProntuarioMotivoInternacaoPs>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[ProntuarioMotivoInternacaoPs[], number]> {
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
          where += ' `ProntuarioMotivoInternacaoPs`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `ProntuarioMotivoInternacaoPs`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.prontuarioMotivoInternacaoPsRepository.findAndCount(options);
  }

  async save(prontuarioMotivoInternacaoPs: ProntuarioMotivoInternacaoPs): Promise<ProntuarioMotivoInternacaoPs | undefined> {
    return await this.prontuarioMotivoInternacaoPsRepository.save(prontuarioMotivoInternacaoPs);
  }

  async update(prontuarioMotivoInternacaoPs: ProntuarioMotivoInternacaoPs): Promise<ProntuarioMotivoInternacaoPs | undefined> {
    return await this.save(prontuarioMotivoInternacaoPs);
  }

  async delete(prontuarioMotivoInternacaoPs: ProntuarioMotivoInternacaoPs): Promise<ProntuarioMotivoInternacaoPs | undefined> {
    return await this.prontuarioMotivoInternacaoPsRepository.remove(prontuarioMotivoInternacaoPs);
  }
}

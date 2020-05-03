import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import ProntuarioTipoMotivo from '../domain/prontuario-tipo-motivo.entity';
import { ProntuarioTipoMotivoRepository } from '../repository/prontuario-tipo-motivo.repository';

const relationshipNames = [];

@Injectable()
export class ProntuarioTipoMotivoService {
  logger = new Logger('ProntuarioTipoMotivoService');

  constructor(@InjectRepository(ProntuarioTipoMotivoRepository) private prontuarioTipoMotivoRepository: ProntuarioTipoMotivoRepository) {}

  async findById(id: string): Promise<ProntuarioTipoMotivo | undefined> {
    const options = { relations: relationshipNames };
    return await this.prontuarioTipoMotivoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<ProntuarioTipoMotivo>): Promise<ProntuarioTipoMotivo | undefined> {
    return await this.prontuarioTipoMotivoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<ProntuarioTipoMotivo>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[ProntuarioTipoMotivo[], number]> {
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
          where += ' `ProntuarioTipoMotivo`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `ProntuarioTipoMotivo`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.prontuarioTipoMotivoRepository.findAndCount(options);
  }

  async save(prontuarioTipoMotivo: ProntuarioTipoMotivo): Promise<ProntuarioTipoMotivo | undefined> {
    return await this.prontuarioTipoMotivoRepository.save(prontuarioTipoMotivo);
  }

  async update(prontuarioTipoMotivo: ProntuarioTipoMotivo): Promise<ProntuarioTipoMotivo | undefined> {
    return await this.save(prontuarioTipoMotivo);
  }

  async delete(prontuarioTipoMotivo: ProntuarioTipoMotivo): Promise<ProntuarioTipoMotivo | undefined> {
    return await this.prontuarioTipoMotivoRepository.remove(prontuarioTipoMotivo);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import TipoPreferenciaAtendimento from '../domain/tipo-preferencia-atendimento.entity';
import { TipoPreferenciaAtendimentoRepository } from '../repository/tipo-preferencia-atendimento.repository';

const relationshipNames = [];

@Injectable()
export class TipoPreferenciaAtendimentoService {
  logger = new Logger('TipoPreferenciaAtendimentoService');

  constructor(
    @InjectRepository(TipoPreferenciaAtendimentoRepository)
    private tipoPreferenciaAtendimentoRepository: TipoPreferenciaAtendimentoRepository
  ) {}

  async findById(id: string): Promise<TipoPreferenciaAtendimento | undefined> {
    const options = { relations: relationshipNames };
    return await this.tipoPreferenciaAtendimentoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<TipoPreferenciaAtendimento>): Promise<TipoPreferenciaAtendimento | undefined> {
    return await this.tipoPreferenciaAtendimentoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<TipoPreferenciaAtendimento>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[TipoPreferenciaAtendimento[], number]> {
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
          where += ' `TipoPreferenciaAtendimento`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `TipoPreferenciaAtendimento`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.tipoPreferenciaAtendimentoRepository.findAndCount(options);
  }

  async save(tipoPreferenciaAtendimento: TipoPreferenciaAtendimento): Promise<TipoPreferenciaAtendimento | undefined> {
    return await this.tipoPreferenciaAtendimentoRepository.save(tipoPreferenciaAtendimento);
  }

  async update(tipoPreferenciaAtendimento: TipoPreferenciaAtendimento): Promise<TipoPreferenciaAtendimento | undefined> {
    return await this.save(tipoPreferenciaAtendimento);
  }

  async delete(tipoPreferenciaAtendimento: TipoPreferenciaAtendimento): Promise<TipoPreferenciaAtendimento | undefined> {
    return await this.tipoPreferenciaAtendimentoRepository.remove(tipoPreferenciaAtendimento);
  }
}

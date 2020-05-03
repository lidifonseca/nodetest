import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import PacienteDadosCartao from '../domain/paciente-dados-cartao.entity';
import { PacienteDadosCartaoRepository } from '../repository/paciente-dados-cartao.repository';

const relationshipNames = [];
relationshipNames.push('idPaciente');

@Injectable()
export class PacienteDadosCartaoService {
  logger = new Logger('PacienteDadosCartaoService');

  constructor(@InjectRepository(PacienteDadosCartaoRepository) private pacienteDadosCartaoRepository: PacienteDadosCartaoRepository) {}

  async findById(id: string): Promise<PacienteDadosCartao | undefined> {
    const options = { relations: relationshipNames };
    return await this.pacienteDadosCartaoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PacienteDadosCartao>): Promise<PacienteDadosCartao | undefined> {
    return await this.pacienteDadosCartaoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<PacienteDadosCartao>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[PacienteDadosCartao[], number]> {
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
          where += ' `PacienteDadosCartao`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `PacienteDadosCartao`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.pacienteDadosCartaoRepository.findAndCount(options);
  }

  async save(pacienteDadosCartao: PacienteDadosCartao): Promise<PacienteDadosCartao | undefined> {
    return await this.pacienteDadosCartaoRepository.save(pacienteDadosCartao);
  }

  async update(pacienteDadosCartao: PacienteDadosCartao): Promise<PacienteDadosCartao | undefined> {
    return await this.save(pacienteDadosCartao);
  }

  async delete(pacienteDadosCartao: PacienteDadosCartao): Promise<PacienteDadosCartao | undefined> {
    return await this.pacienteDadosCartaoRepository.remove(pacienteDadosCartao);
  }
}

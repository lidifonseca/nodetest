import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import PacienteDadosCartao from '../domain/paciente-dados-cartao.entity';
import { PacienteDadosCartaoRepository } from '../repository/paciente-dados-cartao.repository';

const relationshipNames = [];

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

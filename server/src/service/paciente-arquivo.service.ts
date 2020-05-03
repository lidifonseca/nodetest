import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import PacienteArquivo from '../domain/paciente-arquivo.entity';
import { PacienteArquivoRepository } from '../repository/paciente-arquivo.repository';

const relationshipNames = [];

@Injectable()
export class PacienteArquivoService {
  logger = new Logger('PacienteArquivoService');

  constructor(@InjectRepository(PacienteArquivoRepository) private pacienteArquivoRepository: PacienteArquivoRepository) {}

  async findById(id: string): Promise<PacienteArquivo | undefined> {
    const options = { relations: relationshipNames };
    return await this.pacienteArquivoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PacienteArquivo>): Promise<PacienteArquivo | undefined> {
    return await this.pacienteArquivoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<PacienteArquivo>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[PacienteArquivo[], number]> {
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
          where += ' `PacienteArquivo`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `PacienteArquivo`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.pacienteArquivoRepository.findAndCount(options);
  }

  async save(pacienteArquivo: PacienteArquivo): Promise<PacienteArquivo | undefined> {
    return await this.pacienteArquivoRepository.save(pacienteArquivo);
  }

  async update(pacienteArquivo: PacienteArquivo): Promise<PacienteArquivo | undefined> {
    return await this.save(pacienteArquivo);
  }

  async delete(pacienteArquivo: PacienteArquivo): Promise<PacienteArquivo | undefined> {
    return await this.pacienteArquivoRepository.remove(pacienteArquivo);
  }
}

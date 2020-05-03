import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import PacienteServico from '../domain/paciente-servico.entity';
import { PacienteServicoRepository } from '../repository/paciente-servico.repository';

const relationshipNames = [];

@Injectable()
export class PacienteServicoService {
  logger = new Logger('PacienteServicoService');

  constructor(@InjectRepository(PacienteServicoRepository) private pacienteServicoRepository: PacienteServicoRepository) {}

  async findById(id: string): Promise<PacienteServico | undefined> {
    const options = { relations: relationshipNames };
    return await this.pacienteServicoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PacienteServico>): Promise<PacienteServico | undefined> {
    return await this.pacienteServicoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<PacienteServico>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[PacienteServico[], number]> {
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
          where += ' `PacienteServico`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `PacienteServico`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.pacienteServicoRepository.findAndCount(options);
  }

  async save(pacienteServico: PacienteServico): Promise<PacienteServico | undefined> {
    return await this.pacienteServicoRepository.save(pacienteServico);
  }

  async update(pacienteServico: PacienteServico): Promise<PacienteServico | undefined> {
    return await this.save(pacienteServico);
  }

  async delete(pacienteServico: PacienteServico): Promise<PacienteServico | undefined> {
    return await this.pacienteServicoRepository.remove(pacienteServico);
  }
}

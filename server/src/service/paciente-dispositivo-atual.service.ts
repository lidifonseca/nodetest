import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import PacienteDispositivoAtual from '../domain/paciente-dispositivo-atual.entity';
import { PacienteDispositivoAtualRepository } from '../repository/paciente-dispositivo-atual.repository';

const relationshipNames = [];

@Injectable()
export class PacienteDispositivoAtualService {
  logger = new Logger('PacienteDispositivoAtualService');

  constructor(
    @InjectRepository(PacienteDispositivoAtualRepository) private pacienteDispositivoAtualRepository: PacienteDispositivoAtualRepository
  ) {}

  async findById(id: string): Promise<PacienteDispositivoAtual | undefined> {
    const options = { relations: relationshipNames };
    return await this.pacienteDispositivoAtualRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PacienteDispositivoAtual>): Promise<PacienteDispositivoAtual | undefined> {
    return await this.pacienteDispositivoAtualRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<PacienteDispositivoAtual>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[PacienteDispositivoAtual[], number]> {
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
    return await this.pacienteDispositivoAtualRepository.findAndCount(options);
  }

  async save(pacienteDispositivoAtual: PacienteDispositivoAtual): Promise<PacienteDispositivoAtual | undefined> {
    return await this.pacienteDispositivoAtualRepository.save(pacienteDispositivoAtual);
  }

  async update(pacienteDispositivoAtual: PacienteDispositivoAtual): Promise<PacienteDispositivoAtual | undefined> {
    return await this.save(pacienteDispositivoAtual);
  }

  async delete(pacienteDispositivoAtual: PacienteDispositivoAtual): Promise<PacienteDispositivoAtual | undefined> {
    return await this.pacienteDispositivoAtualRepository.remove(pacienteDispositivoAtual);
  }
}

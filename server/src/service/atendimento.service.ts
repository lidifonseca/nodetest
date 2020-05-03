import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Atendimento from '../domain/atendimento.entity';
import { AtendimentoRepository } from '../repository/atendimento.repository';

const relationshipNames = [];
relationshipNames.push('idPaciente');
relationshipNames.push('idOperadora');
relationshipNames.push('idEspecialidade');
relationshipNames.push('idPadItem');
relationshipNames.push('idStatusAtendimento');
relationshipNames.push('idPeriodo');
relationshipNames.push('idCidade');

@Injectable()
export class AtendimentoService {
  logger = new Logger('AtendimentoService');

  constructor(@InjectRepository(AtendimentoRepository) private atendimentoRepository: AtendimentoRepository) {}

  async findById(id: string): Promise<Atendimento | undefined> {
    const options = { relations: relationshipNames };
    return await this.atendimentoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Atendimento>): Promise<Atendimento | undefined> {
    return await this.atendimentoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<Atendimento>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[Atendimento[], number]> {
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
          where += ' `Atendimento`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `Atendimento`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.atendimentoRepository.findAndCount(options);
  }

  async save(atendimento: Atendimento): Promise<Atendimento | undefined> {
    return await this.atendimentoRepository.save(atendimento);
  }

  async update(atendimento: Atendimento): Promise<Atendimento | undefined> {
    return await this.save(atendimento);
  }

  async delete(atendimento: Atendimento): Promise<Atendimento | undefined> {
    return await this.atendimentoRepository.remove(atendimento);
  }
}

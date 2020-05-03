import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import AtendimentoSorteioFeito from '../domain/atendimento-sorteio-feito.entity';
import { AtendimentoSorteioFeitoRepository } from '../repository/atendimento-sorteio-feito.repository';

const relationshipNames = [];
relationshipNames.push('idPadItem');

@Injectable()
export class AtendimentoSorteioFeitoService {
  logger = new Logger('AtendimentoSorteioFeitoService');

  constructor(
    @InjectRepository(AtendimentoSorteioFeitoRepository) private atendimentoSorteioFeitoRepository: AtendimentoSorteioFeitoRepository
  ) {}

  async findById(id: string): Promise<AtendimentoSorteioFeito | undefined> {
    const options = { relations: relationshipNames };
    return await this.atendimentoSorteioFeitoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<AtendimentoSorteioFeito>): Promise<AtendimentoSorteioFeito | undefined> {
    return await this.atendimentoSorteioFeitoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<AtendimentoSorteioFeito>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[AtendimentoSorteioFeito[], number]> {
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
          where += ' `AtendimentoSorteioFeito`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `AtendimentoSorteioFeito`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.atendimentoSorteioFeitoRepository.findAndCount(options);
  }

  async save(atendimentoSorteioFeito: AtendimentoSorteioFeito): Promise<AtendimentoSorteioFeito | undefined> {
    return await this.atendimentoSorteioFeitoRepository.save(atendimentoSorteioFeito);
  }

  async update(atendimentoSorteioFeito: AtendimentoSorteioFeito): Promise<AtendimentoSorteioFeito | undefined> {
    return await this.save(atendimentoSorteioFeito);
  }

  async delete(atendimentoSorteioFeito: AtendimentoSorteioFeito): Promise<AtendimentoSorteioFeito | undefined> {
    return await this.atendimentoSorteioFeitoRepository.remove(atendimentoSorteioFeito);
  }
}

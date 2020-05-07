import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import AtendimentoSorteioFeito from '../domain/atendimento-sorteio-feito.entity';
import { AtendimentoSorteioFeitoRepository } from '../repository/atendimento-sorteio-feito.repository';

const relationshipNames = [];

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

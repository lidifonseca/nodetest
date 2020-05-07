import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import StatusAtualLigacao from '../domain/status-atual-ligacao.entity';
import { StatusAtualLigacaoRepository } from '../repository/status-atual-ligacao.repository';

const relationshipNames = [];

@Injectable()
export class StatusAtualLigacaoService {
  logger = new Logger('StatusAtualLigacaoService');

  constructor(@InjectRepository(StatusAtualLigacaoRepository) private statusAtualLigacaoRepository: StatusAtualLigacaoRepository) {}

  async findById(id: string): Promise<StatusAtualLigacao | undefined> {
    const options = { relations: relationshipNames };
    return await this.statusAtualLigacaoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<StatusAtualLigacao>): Promise<StatusAtualLigacao | undefined> {
    return await this.statusAtualLigacaoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<StatusAtualLigacao>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[StatusAtualLigacao[], number]> {
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
    return await this.statusAtualLigacaoRepository.findAndCount(options);
  }

  async save(statusAtualLigacao: StatusAtualLigacao): Promise<StatusAtualLigacao | undefined> {
    return await this.statusAtualLigacaoRepository.save(statusAtualLigacao);
  }

  async update(statusAtualLigacao: StatusAtualLigacao): Promise<StatusAtualLigacao | undefined> {
    return await this.save(statusAtualLigacao);
  }

  async delete(statusAtualLigacao: StatusAtualLigacao): Promise<StatusAtualLigacao | undefined> {
    return await this.statusAtualLigacaoRepository.remove(statusAtualLigacao);
  }
}

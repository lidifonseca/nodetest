import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import AtendimentoImagem from '../domain/atendimento-imagem.entity';
import { AtendimentoImagemRepository } from '../repository/atendimento-imagem.repository';

const relationshipNames = [];

@Injectable()
export class AtendimentoImagemService {
  logger = new Logger('AtendimentoImagemService');

  constructor(@InjectRepository(AtendimentoImagemRepository) private atendimentoImagemRepository: AtendimentoImagemRepository) {}

  async findById(id: string): Promise<AtendimentoImagem | undefined> {
    const options = { relations: relationshipNames };
    return await this.atendimentoImagemRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<AtendimentoImagem>): Promise<AtendimentoImagem | undefined> {
    return await this.atendimentoImagemRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<AtendimentoImagem>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[AtendimentoImagem[], number]> {
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
          where += ' `AtendimentoImagem`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `AtendimentoImagem`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.atendimentoImagemRepository.findAndCount(options);
  }

  async save(atendimentoImagem: AtendimentoImagem): Promise<AtendimentoImagem | undefined> {
    return await this.atendimentoImagemRepository.save(atendimentoImagem);
  }

  async update(atendimentoImagem: AtendimentoImagem): Promise<AtendimentoImagem | undefined> {
    return await this.save(atendimentoImagem);
  }

  async delete(atendimentoImagem: AtendimentoImagem): Promise<AtendimentoImagem | undefined> {
    return await this.atendimentoImagemRepository.remove(atendimentoImagem);
  }
}

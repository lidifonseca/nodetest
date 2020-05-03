import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import UsuarioStatusAtual from '../domain/usuario-status-atual.entity';
import { UsuarioStatusAtualRepository } from '../repository/usuario-status-atual.repository';

const relationshipNames = [];

@Injectable()
export class UsuarioStatusAtualService {
  logger = new Logger('UsuarioStatusAtualService');

  constructor(@InjectRepository(UsuarioStatusAtualRepository) private usuarioStatusAtualRepository: UsuarioStatusAtualRepository) {}

  async findById(id: string): Promise<UsuarioStatusAtual | undefined> {
    const options = { relations: relationshipNames };
    return await this.usuarioStatusAtualRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<UsuarioStatusAtual>): Promise<UsuarioStatusAtual | undefined> {
    return await this.usuarioStatusAtualRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<UsuarioStatusAtual>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[UsuarioStatusAtual[], number]> {
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
          where += ' `UsuarioStatusAtual`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `UsuarioStatusAtual`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.usuarioStatusAtualRepository.findAndCount(options);
  }

  async save(usuarioStatusAtual: UsuarioStatusAtual): Promise<UsuarioStatusAtual | undefined> {
    return await this.usuarioStatusAtualRepository.save(usuarioStatusAtual);
  }

  async update(usuarioStatusAtual: UsuarioStatusAtual): Promise<UsuarioStatusAtual | undefined> {
    return await this.save(usuarioStatusAtual);
  }

  async delete(usuarioStatusAtual: UsuarioStatusAtual): Promise<UsuarioStatusAtual | undefined> {
    return await this.usuarioStatusAtualRepository.remove(usuarioStatusAtual);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import TipoUsuario from '../domain/tipo-usuario.entity';
import { TipoUsuarioRepository } from '../repository/tipo-usuario.repository';

const relationshipNames = [];

@Injectable()
export class TipoUsuarioService {
  logger = new Logger('TipoUsuarioService');

  constructor(@InjectRepository(TipoUsuarioRepository) private tipoUsuarioRepository: TipoUsuarioRepository) {}

  async findById(id: string): Promise<TipoUsuario | undefined> {
    const options = { relations: relationshipNames };
    return await this.tipoUsuarioRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<TipoUsuario>): Promise<TipoUsuario | undefined> {
    return await this.tipoUsuarioRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<TipoUsuario>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[TipoUsuario[], number]> {
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
          where += ' `TipoUsuario`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `TipoUsuario`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.tipoUsuarioRepository.findAndCount(options);
  }

  async save(tipoUsuario: TipoUsuario): Promise<TipoUsuario | undefined> {
    return await this.tipoUsuarioRepository.save(tipoUsuario);
  }

  async update(tipoUsuario: TipoUsuario): Promise<TipoUsuario | undefined> {
    return await this.save(tipoUsuario);
  }

  async delete(tipoUsuario: TipoUsuario): Promise<TipoUsuario | undefined> {
    return await this.tipoUsuarioRepository.remove(tipoUsuario);
  }
}

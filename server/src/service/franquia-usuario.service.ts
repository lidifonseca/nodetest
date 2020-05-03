import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import FranquiaUsuario from '../domain/franquia-usuario.entity';
import { FranquiaUsuarioRepository } from '../repository/franquia-usuario.repository';

const relationshipNames = [];
relationshipNames.push('idFranquia');

@Injectable()
export class FranquiaUsuarioService {
  logger = new Logger('FranquiaUsuarioService');

  constructor(@InjectRepository(FranquiaUsuarioRepository) private franquiaUsuarioRepository: FranquiaUsuarioRepository) {}

  async findById(id: string): Promise<FranquiaUsuario | undefined> {
    const options = { relations: relationshipNames };
    return await this.franquiaUsuarioRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<FranquiaUsuario>): Promise<FranquiaUsuario | undefined> {
    return await this.franquiaUsuarioRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<FranquiaUsuario>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[FranquiaUsuario[], number]> {
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
          where += ' `FranquiaUsuario`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `FranquiaUsuario`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.franquiaUsuarioRepository.findAndCount(options);
  }

  async save(franquiaUsuario: FranquiaUsuario): Promise<FranquiaUsuario | undefined> {
    return await this.franquiaUsuarioRepository.save(franquiaUsuario);
  }

  async update(franquiaUsuario: FranquiaUsuario): Promise<FranquiaUsuario | undefined> {
    return await this.save(franquiaUsuario);
  }

  async delete(franquiaUsuario: FranquiaUsuario): Promise<FranquiaUsuario | undefined> {
    return await this.franquiaUsuarioRepository.remove(franquiaUsuario);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Usuario from '../domain/usuario.entity';
import { UsuarioRepository } from '../repository/usuario.repository';

const relationshipNames = [];
relationshipNames.push('idTipoUsuario');

@Injectable()
export class UsuarioService {
  logger = new Logger('UsuarioService');

  constructor(@InjectRepository(UsuarioRepository) private usuarioRepository: UsuarioRepository) {}

  async findById(id: string): Promise<Usuario | undefined> {
    const options = { relations: relationshipNames };
    return await this.usuarioRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Usuario>): Promise<Usuario | undefined> {
    return await this.usuarioRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<Usuario>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[Usuario[], number]> {
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
          where += ' `Usuario`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `Usuario`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.usuarioRepository.findAndCount(options);
  }

  async save(usuario: Usuario): Promise<Usuario | undefined> {
    return await this.usuarioRepository.save(usuario);
  }

  async update(usuario: Usuario): Promise<Usuario | undefined> {
    return await this.save(usuario);
  }

  async delete(usuario: Usuario): Promise<Usuario | undefined> {
    return await this.usuarioRepository.remove(usuario);
  }
}

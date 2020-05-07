import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
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

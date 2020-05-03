import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import UsuarioPanico from '../domain/usuario-panico.entity';
import { UsuarioPanicoRepository } from '../repository/usuario-panico.repository';

const relationshipNames = [];

@Injectable()
export class UsuarioPanicoService {
  logger = new Logger('UsuarioPanicoService');

  constructor(@InjectRepository(UsuarioPanicoRepository) private usuarioPanicoRepository: UsuarioPanicoRepository) {}

  async findById(id: string): Promise<UsuarioPanico | undefined> {
    const options = { relations: relationshipNames };
    return await this.usuarioPanicoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<UsuarioPanico>): Promise<UsuarioPanico | undefined> {
    return await this.usuarioPanicoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<UsuarioPanico>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[UsuarioPanico[], number]> {
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
          where += ' `UsuarioPanico`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `UsuarioPanico`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.usuarioPanicoRepository.findAndCount(options);
  }

  async save(usuarioPanico: UsuarioPanico): Promise<UsuarioPanico | undefined> {
    return await this.usuarioPanicoRepository.save(usuarioPanico);
  }

  async update(usuarioPanico: UsuarioPanico): Promise<UsuarioPanico | undefined> {
    return await this.save(usuarioPanico);
  }

  async delete(usuarioPanico: UsuarioPanico): Promise<UsuarioPanico | undefined> {
    return await this.usuarioPanicoRepository.remove(usuarioPanico);
  }
}

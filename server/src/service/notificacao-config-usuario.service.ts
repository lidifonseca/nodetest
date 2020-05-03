import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import NotificacaoConfigUsuario from '../domain/notificacao-config-usuario.entity';
import { NotificacaoConfigUsuarioRepository } from '../repository/notificacao-config-usuario.repository';

const relationshipNames = [];

@Injectable()
export class NotificacaoConfigUsuarioService {
  logger = new Logger('NotificacaoConfigUsuarioService');

  constructor(
    @InjectRepository(NotificacaoConfigUsuarioRepository) private notificacaoConfigUsuarioRepository: NotificacaoConfigUsuarioRepository
  ) {}

  async findById(id: string): Promise<NotificacaoConfigUsuario | undefined> {
    const options = { relations: relationshipNames };
    return await this.notificacaoConfigUsuarioRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<NotificacaoConfigUsuario>): Promise<NotificacaoConfigUsuario | undefined> {
    return await this.notificacaoConfigUsuarioRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<NotificacaoConfigUsuario>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[NotificacaoConfigUsuario[], number]> {
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
          where += ' `NotificacaoConfigUsuario`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `NotificacaoConfigUsuario`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.notificacaoConfigUsuarioRepository.findAndCount(options);
  }

  async save(notificacaoConfigUsuario: NotificacaoConfigUsuario): Promise<NotificacaoConfigUsuario | undefined> {
    return await this.notificacaoConfigUsuarioRepository.save(notificacaoConfigUsuario);
  }

  async update(notificacaoConfigUsuario: NotificacaoConfigUsuario): Promise<NotificacaoConfigUsuario | undefined> {
    return await this.save(notificacaoConfigUsuario);
  }

  async delete(notificacaoConfigUsuario: NotificacaoConfigUsuario): Promise<NotificacaoConfigUsuario | undefined> {
    return await this.notificacaoConfigUsuarioRepository.remove(notificacaoConfigUsuario);
  }
}

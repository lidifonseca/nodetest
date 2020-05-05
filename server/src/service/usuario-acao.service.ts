import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import UsuarioAcao from '../domain/usuario-acao.entity';
import { UsuarioAcaoRepository } from '../repository/usuario-acao.repository';

const relationshipNames = [];
relationshipNames.push('idTela');
relationshipNames.push('idAcao');

@Injectable()
export class UsuarioAcaoService {
  logger = new Logger('UsuarioAcaoService');

  constructor(@InjectRepository(UsuarioAcaoRepository) private usuarioAcaoRepository: UsuarioAcaoRepository) {}

  async findById(id: string): Promise<UsuarioAcao | undefined> {
    const options = { relations: relationshipNames };
    return await this.usuarioAcaoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<UsuarioAcao>): Promise<UsuarioAcao | undefined> {
    return await this.usuarioAcaoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<UsuarioAcao>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[UsuarioAcao[], number]> {
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
    return await this.usuarioAcaoRepository.findAndCount(options);
  }

  async save(usuarioAcao: UsuarioAcao): Promise<UsuarioAcao | undefined> {
    return await this.usuarioAcaoRepository.save(usuarioAcao);
  }

  async update(usuarioAcao: UsuarioAcao): Promise<UsuarioAcao | undefined> {
    return await this.save(usuarioAcao);
  }

  async delete(usuarioAcao: UsuarioAcao): Promise<UsuarioAcao | undefined> {
    return await this.usuarioAcaoRepository.remove(usuarioAcao);
  }
}

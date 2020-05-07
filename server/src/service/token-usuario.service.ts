import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import TokenUsuario from '../domain/token-usuario.entity';
import { TokenUsuarioRepository } from '../repository/token-usuario.repository';

const relationshipNames = [];

@Injectable()
export class TokenUsuarioService {
  logger = new Logger('TokenUsuarioService');

  constructor(@InjectRepository(TokenUsuarioRepository) private tokenUsuarioRepository: TokenUsuarioRepository) {}

  async findById(id: string): Promise<TokenUsuario | undefined> {
    const options = { relations: relationshipNames };
    return await this.tokenUsuarioRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<TokenUsuario>): Promise<TokenUsuario | undefined> {
    return await this.tokenUsuarioRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<TokenUsuario>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[TokenUsuario[], number]> {
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
    return await this.tokenUsuarioRepository.findAndCount(options);
  }

  async save(tokenUsuario: TokenUsuario): Promise<TokenUsuario | undefined> {
    return await this.tokenUsuarioRepository.save(tokenUsuario);
  }

  async update(tokenUsuario: TokenUsuario): Promise<TokenUsuario | undefined> {
    return await this.save(tokenUsuario);
  }

  async delete(tokenUsuario: TokenUsuario): Promise<TokenUsuario | undefined> {
    return await this.tokenUsuarioRepository.remove(tokenUsuario);
  }
}

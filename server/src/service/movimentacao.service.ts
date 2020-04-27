import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Movimentacao from '../domain/movimentacao.entity';
import { MovimentacaoRepository } from '../repository/movimentacao.repository';

const relationshipNames = [];
relationshipNames.push('processo');

@Injectable()
export class MovimentacaoService {
  logger = new Logger('MovimentacaoService');

  constructor(@InjectRepository(MovimentacaoRepository) private movimentacaoRepository: MovimentacaoRepository) {}

  async findById(id: string): Promise<Movimentacao | undefined> {
    const options = { relations: relationshipNames };
    return await this.movimentacaoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Movimentacao>): Promise<Movimentacao | undefined> {
    return await this.movimentacaoRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<Movimentacao>): Promise<[Movimentacao[], number]> {
    options.relations = relationshipNames;
    return await this.movimentacaoRepository.findAndCount(options);
  }

  async save(movimentacao: Movimentacao): Promise<Movimentacao | undefined> {
    return await this.movimentacaoRepository.save(movimentacao);
  }

  async update(movimentacao: Movimentacao): Promise<Movimentacao | undefined> {
    return await this.save(movimentacao);
  }

  async delete(movimentacao: Movimentacao): Promise<Movimentacao | undefined> {
    return await this.movimentacaoRepository.remove(movimentacao);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Peticao from '../domain/peticao.entity';
import { PeticaoRepository } from '../repository/peticao.repository';

const relationshipNames = [];
relationshipNames.push('processo');

@Injectable()
export class PeticaoService {
  logger = new Logger('PeticaoService');

  constructor(@InjectRepository(PeticaoRepository) private peticaoRepository: PeticaoRepository) {}

  async findById(id: string): Promise<Peticao | undefined> {
    const options = { relations: relationshipNames };
    return await this.peticaoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Peticao>): Promise<Peticao | undefined> {
    return await this.peticaoRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<Peticao>): Promise<[Peticao[], number]> {
    options.relations = relationshipNames;
    return await this.peticaoRepository.findAndCount(options);
  }

  async save(peticao: Peticao): Promise<Peticao | undefined> {
    return await this.peticaoRepository.save(peticao);
  }

  async update(peticao: Peticao): Promise<Peticao | undefined> {
    return await this.save(peticao);
  }

  async delete(peticao: Peticao): Promise<Peticao | undefined> {
    return await this.peticaoRepository.remove(peticao);
  }
}

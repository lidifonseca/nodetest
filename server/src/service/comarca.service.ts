import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Comarca from '../domain/comarca.entity';
import { ComarcaRepository } from '../repository/comarca.repository';

const relationshipNames = [];
relationshipNames.push('estado');

@Injectable()
export class ComarcaService {
  logger = new Logger('ComarcaService');

  constructor(@InjectRepository(ComarcaRepository) private comarcaRepository: ComarcaRepository) {}

  async findById(id: string): Promise<Comarca | undefined> {
    const options = { relations: relationshipNames };
    return await this.comarcaRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Comarca>): Promise<Comarca | undefined> {
    return await this.comarcaRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<Comarca>): Promise<[Comarca[], number]> {
    options.relations = relationshipNames;
    return await this.comarcaRepository.findAndCount(options);
  }

  async save(comarca: Comarca): Promise<Comarca | undefined> {
    return await this.comarcaRepository.save(comarca);
  }

  async update(comarca: Comarca): Promise<Comarca | undefined> {
    return await this.save(comarca);
  }

  async delete(comarca: Comarca): Promise<Comarca | undefined> {
    return await this.comarcaRepository.remove(comarca);
  }
}

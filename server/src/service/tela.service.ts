import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import Tela from '../domain/tela.entity';
import { TelaRepository } from '../repository/tela.repository';

const relationshipNames = [];

@Injectable()
export class TelaService {
  logger = new Logger('TelaService');

  constructor(@InjectRepository(TelaRepository) private telaRepository: TelaRepository) {}

  async findById(id: string): Promise<Tela | undefined> {
    const options = { relations: relationshipNames };
    return await this.telaRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Tela>): Promise<Tela | undefined> {
    return await this.telaRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<Tela>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[Tela[], number]> {
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
    return await this.telaRepository.findAndCount(options);
  }

  async save(tela: Tela): Promise<Tela | undefined> {
    return await this.telaRepository.save(tela);
  }

  async update(tela: Tela): Promise<Tela | undefined> {
    return await this.save(tela);
  }

  async delete(tela: Tela): Promise<Tela | undefined> {
    return await this.telaRepository.remove(tela);
  }
}

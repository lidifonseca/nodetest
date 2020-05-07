import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import PadItemSorteioFeito from '../domain/pad-item-sorteio-feito.entity';
import { PadItemSorteioFeitoRepository } from '../repository/pad-item-sorteio-feito.repository';

const relationshipNames = [];

@Injectable()
export class PadItemSorteioFeitoService {
  logger = new Logger('PadItemSorteioFeitoService');

  constructor(@InjectRepository(PadItemSorteioFeitoRepository) private padItemSorteioFeitoRepository: PadItemSorteioFeitoRepository) {}

  async findById(id: string): Promise<PadItemSorteioFeito | undefined> {
    const options = { relations: relationshipNames };
    return await this.padItemSorteioFeitoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PadItemSorteioFeito>): Promise<PadItemSorteioFeito | undefined> {
    return await this.padItemSorteioFeitoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<PadItemSorteioFeito>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[PadItemSorteioFeito[], number]> {
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
    return await this.padItemSorteioFeitoRepository.findAndCount(options);
  }

  async save(padItemSorteioFeito: PadItemSorteioFeito): Promise<PadItemSorteioFeito | undefined> {
    return await this.padItemSorteioFeitoRepository.save(padItemSorteioFeito);
  }

  async update(padItemSorteioFeito: PadItemSorteioFeito): Promise<PadItemSorteioFeito | undefined> {
    return await this.save(padItemSorteioFeito);
  }

  async delete(padItemSorteioFeito: PadItemSorteioFeito): Promise<PadItemSorteioFeito | undefined> {
    return await this.padItemSorteioFeitoRepository.remove(padItemSorteioFeito);
  }
}

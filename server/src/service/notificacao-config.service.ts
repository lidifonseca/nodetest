import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import NotificacaoConfig from '../domain/notificacao-config.entity';
import { NotificacaoConfigRepository } from '../repository/notificacao-config.repository';

const relationshipNames = [];

@Injectable()
export class NotificacaoConfigService {
  logger = new Logger('NotificacaoConfigService');

  constructor(@InjectRepository(NotificacaoConfigRepository) private notificacaoConfigRepository: NotificacaoConfigRepository) {}

  async findById(id: string): Promise<NotificacaoConfig | undefined> {
    const options = { relations: relationshipNames };
    return await this.notificacaoConfigRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<NotificacaoConfig>): Promise<NotificacaoConfig | undefined> {
    return await this.notificacaoConfigRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<NotificacaoConfig>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[NotificacaoConfig[], number]> {
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
          where += ' `NotificacaoConfig`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `NotificacaoConfig`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.notificacaoConfigRepository.findAndCount(options);
  }

  async save(notificacaoConfig: NotificacaoConfig): Promise<NotificacaoConfig | undefined> {
    return await this.notificacaoConfigRepository.save(notificacaoConfig);
  }

  async update(notificacaoConfig: NotificacaoConfig): Promise<NotificacaoConfig | undefined> {
    return await this.save(notificacaoConfig);
  }

  async delete(notificacaoConfig: NotificacaoConfig): Promise<NotificacaoConfig | undefined> {
    return await this.notificacaoConfigRepository.remove(notificacaoConfig);
  }
}

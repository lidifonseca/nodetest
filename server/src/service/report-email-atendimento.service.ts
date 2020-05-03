import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import ReportEmailAtendimento from '../domain/report-email-atendimento.entity';
import { ReportEmailAtendimentoRepository } from '../repository/report-email-atendimento.repository';

const relationshipNames = [];

@Injectable()
export class ReportEmailAtendimentoService {
  logger = new Logger('ReportEmailAtendimentoService');

  constructor(
    @InjectRepository(ReportEmailAtendimentoRepository) private reportEmailAtendimentoRepository: ReportEmailAtendimentoRepository
  ) {}

  async findById(id: string): Promise<ReportEmailAtendimento | undefined> {
    const options = { relations: relationshipNames };
    return await this.reportEmailAtendimentoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<ReportEmailAtendimento>): Promise<ReportEmailAtendimento | undefined> {
    return await this.reportEmailAtendimentoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<ReportEmailAtendimento>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[ReportEmailAtendimento[], number]> {
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
          where += ' `ReportEmailAtendimento`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `ReportEmailAtendimento`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.reportEmailAtendimentoRepository.findAndCount(options);
  }

  async save(reportEmailAtendimento: ReportEmailAtendimento): Promise<ReportEmailAtendimento | undefined> {
    return await this.reportEmailAtendimentoRepository.save(reportEmailAtendimento);
  }

  async update(reportEmailAtendimento: ReportEmailAtendimento): Promise<ReportEmailAtendimento | undefined> {
    return await this.save(reportEmailAtendimento);
  }

  async delete(reportEmailAtendimento: ReportEmailAtendimento): Promise<ReportEmailAtendimento | undefined> {
    return await this.reportEmailAtendimentoRepository.remove(reportEmailAtendimento);
  }
}

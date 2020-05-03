import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import PacientePedido from '../domain/paciente-pedido.entity';
import { PacientePedidoRepository } from '../repository/paciente-pedido.repository';

const relationshipNames = [];
relationshipNames.push('unidade');
relationshipNames.push('idPaciente');
relationshipNames.push('idCartao');
relationshipNames.push('idEspecialidade');

@Injectable()
export class PacientePedidoService {
  logger = new Logger('PacientePedidoService');

  constructor(@InjectRepository(PacientePedidoRepository) private pacientePedidoRepository: PacientePedidoRepository) {}

  async findById(id: string): Promise<PacientePedido | undefined> {
    const options = { relations: relationshipNames };
    return await this.pacientePedidoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PacientePedido>): Promise<PacientePedido | undefined> {
    return await this.pacientePedidoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<PacientePedido>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[PacientePedido[], number]> {
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
    return await this.pacientePedidoRepository.findAndCount(options);
  }

  async save(pacientePedido: PacientePedido): Promise<PacientePedido | undefined> {
    return await this.pacientePedidoRepository.save(pacientePedido);
  }

  async update(pacientePedido: PacientePedido): Promise<PacientePedido | undefined> {
    return await this.save(pacientePedido);
  }

  async delete(pacientePedido: PacientePedido): Promise<PacientePedido | undefined> {
    return await this.pacientePedidoRepository.remove(pacientePedido);
  }
}

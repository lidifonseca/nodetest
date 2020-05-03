import { EntityRepository, Repository } from 'typeorm';
import PacientePedido from '../domain/paciente-pedido.entity';

@EntityRepository(PacientePedido)
export class PacientePedidoRepository extends Repository<PacientePedido> {}

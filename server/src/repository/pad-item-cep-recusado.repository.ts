import { EntityRepository, Repository } from 'typeorm';
import PadItemCepRecusado from '../domain/pad-item-cep-recusado.entity';

@EntityRepository(PadItemCepRecusado)
export class PadItemCepRecusadoRepository extends Repository<PadItemCepRecusado> {}

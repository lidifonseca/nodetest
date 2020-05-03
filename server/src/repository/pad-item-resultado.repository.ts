import { EntityRepository, Repository } from 'typeorm';
import PadItemResultado from '../domain/pad-item-resultado.entity';

@EntityRepository(PadItemResultado)
export class PadItemResultadoRepository extends Repository<PadItemResultado> {}

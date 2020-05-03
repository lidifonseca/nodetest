import { EntityRepository, Repository } from 'typeorm';
import PadItemIndicadores from '../domain/pad-item-indicadores.entity';

@EntityRepository(PadItemIndicadores)
export class PadItemIndicadoresRepository extends Repository<PadItemIndicadores> {}

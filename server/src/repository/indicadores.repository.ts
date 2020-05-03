import { EntityRepository, Repository } from 'typeorm';
import Indicadores from '../domain/indicadores.entity';

@EntityRepository(Indicadores)
export class IndicadoresRepository extends Repository<Indicadores> {}

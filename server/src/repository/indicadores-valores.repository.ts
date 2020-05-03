import { EntityRepository, Repository } from 'typeorm';
import IndicadoresValores from '../domain/indicadores-valores.entity';

@EntityRepository(IndicadoresValores)
export class IndicadoresValoresRepository extends Repository<IndicadoresValores> {}

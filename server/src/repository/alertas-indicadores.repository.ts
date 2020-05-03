import { EntityRepository, Repository } from 'typeorm';
import AlertasIndicadores from '../domain/alertas-indicadores.entity';

@EntityRepository(AlertasIndicadores)
export class AlertasIndicadoresRepository extends Repository<AlertasIndicadores> {}

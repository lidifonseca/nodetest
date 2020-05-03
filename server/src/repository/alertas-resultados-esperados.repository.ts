import { EntityRepository, Repository } from 'typeorm';
import AlertasResultadosEsperados from '../domain/alertas-resultados-esperados.entity';

@EntityRepository(AlertasResultadosEsperados)
export class AlertasResultadosEsperadosRepository extends Repository<AlertasResultadosEsperados> {}

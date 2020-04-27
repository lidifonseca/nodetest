import { EntityRepository, Repository } from 'typeorm';
import HistoricoClase from '../domain/historico-clase.entity';

@EntityRepository(HistoricoClase)
export class HistoricoClaseRepository extends Repository<HistoricoClase> {}

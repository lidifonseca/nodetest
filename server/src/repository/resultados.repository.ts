import { EntityRepository, Repository } from 'typeorm';
import Resultados from '../domain/resultados.entity';

@EntityRepository(Resultados)
export class ResultadosRepository extends Repository<Resultados> {}

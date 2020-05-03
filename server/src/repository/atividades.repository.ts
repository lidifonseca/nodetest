import { EntityRepository, Repository } from 'typeorm';
import Atividades from '../domain/atividades.entity';

@EntityRepository(Atividades)
export class AtividadesRepository extends Repository<Atividades> {}

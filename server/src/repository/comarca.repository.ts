import { EntityRepository, Repository } from 'typeorm';
import Comarca from '../domain/comarca.entity';

@EntityRepository(Comarca)
export class ComarcaRepository extends Repository<Comarca> {}

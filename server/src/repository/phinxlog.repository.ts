import { EntityRepository, Repository } from 'typeorm';
import Phinxlog from '../domain/phinxlog.entity';

@EntityRepository(Phinxlog)
export class PhinxlogRepository extends Repository<Phinxlog> {}

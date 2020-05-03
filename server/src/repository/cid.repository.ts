import { EntityRepository, Repository } from 'typeorm';
import Cid from '../domain/cid.entity';

@EntityRepository(Cid)
export class CidRepository extends Repository<Cid> {}

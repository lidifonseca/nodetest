import { EntityRepository, Repository } from 'typeorm';
import CidPta from '../domain/cid-pta.entity';

@EntityRepository(CidPta)
export class CidPtaRepository extends Repository<CidPta> {}

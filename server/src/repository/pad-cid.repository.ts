import { EntityRepository, Repository } from 'typeorm';
import PadCid from '../domain/pad-cid.entity';

@EntityRepository(PadCid)
export class PadCidRepository extends Repository<PadCid> {}

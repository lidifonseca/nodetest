import { EntityRepository, Repository } from 'typeorm';
import PadPta from '../domain/pad-pta.entity';

@EntityRepository(PadPta)
export class PadPtaRepository extends Repository<PadPta> {}

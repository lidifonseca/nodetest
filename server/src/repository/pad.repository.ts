import { EntityRepository, Repository } from 'typeorm';
import Pad from '../domain/pad.entity';

@EntityRepository(Pad)
export class PadRepository extends Repository<Pad> {}

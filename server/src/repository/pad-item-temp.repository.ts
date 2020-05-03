import { EntityRepository, Repository } from 'typeorm';
import PadItemTemp from '../domain/pad-item-temp.entity';

@EntityRepository(PadItemTemp)
export class PadItemTempRepository extends Repository<PadItemTemp> {}

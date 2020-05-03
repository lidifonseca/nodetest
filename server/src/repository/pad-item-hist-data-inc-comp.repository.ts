import { EntityRepository, Repository } from 'typeorm';
import PadItemHistDataIncComp from '../domain/pad-item-hist-data-inc-comp.entity';

@EntityRepository(PadItemHistDataIncComp)
export class PadItemHistDataIncCompRepository extends Repository<PadItemHistDataIncComp> {}

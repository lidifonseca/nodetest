import { EntityRepository, Repository } from 'typeorm';
import PadItem from '../domain/pad-item.entity';

@EntityRepository(PadItem)
export class PadItemRepository extends Repository<PadItem> {}

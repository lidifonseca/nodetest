import { EntityRepository, Repository } from 'typeorm';
import PadItemMeta from '../domain/pad-item-meta.entity';

@EntityRepository(PadItemMeta)
export class PadItemMetaRepository extends Repository<PadItemMeta> {}

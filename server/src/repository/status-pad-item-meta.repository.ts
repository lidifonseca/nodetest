import { EntityRepository, Repository } from 'typeorm';
import StatusPadItemMeta from '../domain/status-pad-item-meta.entity';

@EntityRepository(StatusPadItemMeta)
export class StatusPadItemMetaRepository extends Repository<StatusPadItemMeta> {}

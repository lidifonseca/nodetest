import { EntityRepository, Repository } from 'typeorm';
import PadItemSorteioFeito from '../domain/pad-item-sorteio-feito.entity';

@EntityRepository(PadItemSorteioFeito)
export class PadItemSorteioFeitoRepository extends Repository<PadItemSorteioFeito> {}

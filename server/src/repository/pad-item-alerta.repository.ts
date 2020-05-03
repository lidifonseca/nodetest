import { EntityRepository, Repository } from 'typeorm';
import PadItemAlerta from '../domain/pad-item-alerta.entity';

@EntityRepository(PadItemAlerta)
export class PadItemAlertaRepository extends Repository<PadItemAlerta> {}

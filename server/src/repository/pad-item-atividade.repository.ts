import { EntityRepository, Repository } from 'typeorm';
import PadItemAtividade from '../domain/pad-item-atividade.entity';

@EntityRepository(PadItemAtividade)
export class PadItemAtividadeRepository extends Repository<PadItemAtividade> {}

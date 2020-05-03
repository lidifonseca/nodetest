import { EntityRepository, Repository } from 'typeorm';
import ProfissionalPush from '../domain/profissional-push.entity';

@EntityRepository(ProfissionalPush)
export class ProfissionalPushRepository extends Repository<ProfissionalPush> {}

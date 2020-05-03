import { EntityRepository, Repository } from 'typeorm';
import PacientePush from '../domain/paciente-push.entity';

@EntityRepository(PacientePush)
export class PacientePushRepository extends Repository<PacientePush> {}

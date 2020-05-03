import { EntityRepository, Repository } from 'typeorm';
import StatusAtualProf from '../domain/status-atual-prof.entity';

@EntityRepository(StatusAtualProf)
export class StatusAtualProfRepository extends Repository<StatusAtualProf> {}

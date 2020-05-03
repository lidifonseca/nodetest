import { EntityRepository, Repository } from 'typeorm';
import LogUser from '../domain/log-user.entity';

@EntityRepository(LogUser)
export class LogUserRepository extends Repository<LogUser> {}

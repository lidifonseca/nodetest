import { EntityRepository, Repository } from 'typeorm';
import LogUserFranquia from '../domain/log-user-franquia.entity';

@EntityRepository(LogUserFranquia)
export class LogUserFranquiaRepository extends Repository<LogUserFranquia> {}

import { EntityRepository, Repository } from 'typeorm';
import ApiName from '../domain/api-name.entity';

@EntityRepository(ApiName)
export class ApiNameRepository extends Repository<ApiName> {}

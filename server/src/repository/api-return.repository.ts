import { EntityRepository, Repository } from 'typeorm';
import ApiReturn from '../domain/api-return.entity';

@EntityRepository(ApiReturn)
export class ApiReturnRepository extends Repository<ApiReturn> {}

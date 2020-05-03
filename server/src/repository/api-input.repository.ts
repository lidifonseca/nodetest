import { EntityRepository, Repository } from 'typeorm';
import ApiInput from '../domain/api-input.entity';

@EntityRepository(ApiInput)
export class ApiInputRepository extends Repository<ApiInput> {}

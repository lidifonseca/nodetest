import { EntityRepository, Repository } from 'typeorm';
import GrauParentesco from '../domain/grau-parentesco.entity';

@EntityRepository(GrauParentesco)
export class GrauParentescoRepository extends Repository<GrauParentesco> {}

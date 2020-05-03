import { EntityRepository, Repository } from 'typeorm';
import MatMed from '../domain/mat-med.entity';

@EntityRepository(MatMed)
export class MatMedRepository extends Repository<MatMed> {}

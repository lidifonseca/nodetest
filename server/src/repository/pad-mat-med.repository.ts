import { EntityRepository, Repository } from 'typeorm';
import PadMatMed from '../domain/pad-mat-med.entity';

@EntityRepository(PadMatMed)
export class PadMatMedRepository extends Repository<PadMatMed> {}

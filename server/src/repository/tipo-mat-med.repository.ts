import { EntityRepository, Repository } from 'typeorm';
import TipoMatMed from '../domain/tipo-mat-med.entity';

@EntityRepository(TipoMatMed)
export class TipoMatMedRepository extends Repository<TipoMatMed> {}

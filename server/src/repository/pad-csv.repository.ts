import { EntityRepository, Repository } from 'typeorm';
import PadCsv from '../domain/pad-csv.entity';

@EntityRepository(PadCsv)
export class PadCsvRepository extends Repository<PadCsv> {}

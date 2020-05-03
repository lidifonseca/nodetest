import { EntityRepository, Repository } from 'typeorm';
import DescPta from '../domain/desc-pta.entity';

@EntityRepository(DescPta)
export class DescPtaRepository extends Repository<DescPta> {}

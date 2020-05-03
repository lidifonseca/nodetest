import { EntityRepository, Repository } from 'typeorm';
import CidXPtaNovo from '../domain/cid-x-pta-novo.entity';

@EntityRepository(CidXPtaNovo)
export class CidXPtaNovoRepository extends Repository<CidXPtaNovo> {}

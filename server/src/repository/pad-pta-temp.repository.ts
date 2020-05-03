import { EntityRepository, Repository } from 'typeorm';
import PadPtaTemp from '../domain/pad-pta-temp.entity';

@EntityRepository(PadPtaTemp)
export class PadPtaTempRepository extends Repository<PadPtaTemp> {}

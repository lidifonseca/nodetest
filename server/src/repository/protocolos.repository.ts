import { EntityRepository, Repository } from 'typeorm';
import Protocolos from '../domain/protocolos.entity';

@EntityRepository(Protocolos)
export class ProtocolosRepository extends Repository<Protocolos> {}

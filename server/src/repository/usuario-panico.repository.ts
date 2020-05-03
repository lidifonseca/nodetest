import { EntityRepository, Repository } from 'typeorm';
import UsuarioPanico from '../domain/usuario-panico.entity';

@EntityRepository(UsuarioPanico)
export class UsuarioPanicoRepository extends Repository<UsuarioPanico> {}

import { EntityRepository, Repository } from 'typeorm';
import UsuarioPainelGerencial from '../domain/usuario-painel-gerencial.entity';

@EntityRepository(UsuarioPainelGerencial)
export class UsuarioPainelGerencialRepository extends Repository<UsuarioPainelGerencial> {}

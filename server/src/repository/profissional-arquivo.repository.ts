import { EntityRepository, Repository } from 'typeorm';
import ProfissionalArquivo from '../domain/profissional-arquivo.entity';

@EntityRepository(ProfissionalArquivo)
export class ProfissionalArquivoRepository extends Repository<ProfissionalArquivo> {}

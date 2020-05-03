import { EntityRepository, Repository } from 'typeorm';
import Categoria from '../domain/categoria.entity';

@EntityRepository(Categoria)
export class CategoriaRepository extends Repository<Categoria> {}

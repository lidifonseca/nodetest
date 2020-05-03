import { EntityRepository, Repository } from 'typeorm';
import ImagemProntuario from '../domain/imagem-prontuario.entity';

@EntityRepository(ImagemProntuario)
export class ImagemProntuarioRepository extends Repository<ImagemProntuario> {}

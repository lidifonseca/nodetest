import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import ImagemProntuario from '../src/domain/imagem-prontuario.entity';
import { ImagemProntuarioService } from '../src/service/imagem-prontuario.service';

describe('ImagemProntuario Controller', () => {
  let app: INestApplication;

  const authGuardMock = { canActivate: (): any => true };
  const rolesGuardMock = { canActivate: (): any => true };
  const entityMock: any = {
    id: 'entityId'
  };

  const serviceMock = {
    findById: (): any => entityMock,
    findAndCount: (): any => [entityMock, 0],
    save: (): any => entityMock,
    update: (): any => entityMock,
    delete: (): any => entityMock
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .overrideGuard(RolesGuard)
      .useValue(rolesGuardMock)
      .overrideProvider(ImagemProntuarioService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all imagem-prontuarios ', async () => {
    const getEntities: ImagemProntuario[] = (
      await request(app.getHttpServer())
        .get('/api/imagem-prontuarios')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET imagem-prontuarios by id', async () => {
    const getEntity: ImagemProntuario = (
      await request(app.getHttpServer())
        .get('/api/imagem-prontuarios/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create imagem-prontuarios', async () => {
    const createdEntity: ImagemProntuario = (
      await request(app.getHttpServer())
        .post('/api/imagem-prontuarios')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update imagem-prontuarios', async () => {
    const updatedEntity: ImagemProntuario = (
      await request(app.getHttpServer())
        .put('/api/imagem-prontuarios')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE imagem-prontuarios', async () => {
    const deletedEntity: ImagemProntuario = (
      await request(app.getHttpServer())
        .delete('/api/imagem-prontuarios/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});

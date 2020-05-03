import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import TipoUnidade from '../src/domain/tipo-unidade.entity';
import { TipoUnidadeService } from '../src/service/tipo-unidade.service';

describe('TipoUnidade Controller', () => {
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
      .overrideProvider(TipoUnidadeService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all tipo-unidades ', async () => {
    const getEntities: TipoUnidade[] = (
      await request(app.getHttpServer())
        .get('/api/tipo-unidades')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET tipo-unidades by id', async () => {
    const getEntity: TipoUnidade = (
      await request(app.getHttpServer())
        .get('/api/tipo-unidades/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create tipo-unidades', async () => {
    const createdEntity: TipoUnidade = (
      await request(app.getHttpServer())
        .post('/api/tipo-unidades')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update tipo-unidades', async () => {
    const updatedEntity: TipoUnidade = (
      await request(app.getHttpServer())
        .put('/api/tipo-unidades')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE tipo-unidades', async () => {
    const deletedEntity: TipoUnidade = (
      await request(app.getHttpServer())
        .delete('/api/tipo-unidades/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});

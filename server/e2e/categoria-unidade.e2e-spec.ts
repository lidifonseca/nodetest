import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import CategoriaUnidade from '../src/domain/categoria-unidade.entity';
import { CategoriaUnidadeService } from '../src/service/categoria-unidade.service';

describe('CategoriaUnidade Controller', () => {
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
      .overrideProvider(CategoriaUnidadeService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all categoria-unidades ', async () => {
    const getEntities: CategoriaUnidade[] = (
      await request(app.getHttpServer())
        .get('/api/categoria-unidades')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET categoria-unidades by id', async () => {
    const getEntity: CategoriaUnidade = (
      await request(app.getHttpServer())
        .get('/api/categoria-unidades/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create categoria-unidades', async () => {
    const createdEntity: CategoriaUnidade = (
      await request(app.getHttpServer())
        .post('/api/categoria-unidades')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update categoria-unidades', async () => {
    const updatedEntity: CategoriaUnidade = (
      await request(app.getHttpServer())
        .put('/api/categoria-unidades')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE categoria-unidades', async () => {
    const deletedEntity: CategoriaUnidade = (
      await request(app.getHttpServer())
        .delete('/api/categoria-unidades/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});

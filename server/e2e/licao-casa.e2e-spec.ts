import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import LicaoCasa from '../src/domain/licao-casa.entity';
import { LicaoCasaService } from '../src/service/licao-casa.service';

describe('LicaoCasa Controller', () => {
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
      .overrideProvider(LicaoCasaService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all licao-casas ', async () => {
    const getEntities: LicaoCasa[] = (
      await request(app.getHttpServer())
        .get('/api/licao-casas')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET licao-casas by id', async () => {
    const getEntity: LicaoCasa = (
      await request(app.getHttpServer())
        .get('/api/licao-casas/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create licao-casas', async () => {
    const createdEntity: LicaoCasa = (
      await request(app.getHttpServer())
        .post('/api/licao-casas')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update licao-casas', async () => {
    const updatedEntity: LicaoCasa = (
      await request(app.getHttpServer())
        .put('/api/licao-casas')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE licao-casas', async () => {
    const deletedEntity: LicaoCasa = (
      await request(app.getHttpServer())
        .delete('/api/licao-casas/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});

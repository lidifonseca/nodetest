import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import TipoExame from '../src/domain/tipo-exame.entity';
import { TipoExameService } from '../src/service/tipo-exame.service';

describe('TipoExame Controller', () => {
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
      .overrideProvider(TipoExameService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all tipo-exames ', async () => {
    const getEntities: TipoExame[] = (
      await request(app.getHttpServer())
        .get('/api/tipo-exames')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET tipo-exames by id', async () => {
    const getEntity: TipoExame = (
      await request(app.getHttpServer())
        .get('/api/tipo-exames/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create tipo-exames', async () => {
    const createdEntity: TipoExame = (
      await request(app.getHttpServer())
        .post('/api/tipo-exames')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update tipo-exames', async () => {
    const updatedEntity: TipoExame = (
      await request(app.getHttpServer())
        .put('/api/tipo-exames')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE tipo-exames', async () => {
    const deletedEntity: TipoExame = (
      await request(app.getHttpServer())
        .delete('/api/tipo-exames/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import StatusAtual from '../src/domain/status-atual.entity';
import { StatusAtualService } from '../src/service/status-atual.service';

describe('StatusAtual Controller', () => {
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
      .overrideProvider(StatusAtualService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all status-atuals ', async () => {
    const getEntities: StatusAtual[] = (
      await request(app.getHttpServer())
        .get('/api/status-atuals')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET status-atuals by id', async () => {
    const getEntity: StatusAtual = (
      await request(app.getHttpServer())
        .get('/api/status-atuals/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create status-atuals', async () => {
    const createdEntity: StatusAtual = (
      await request(app.getHttpServer())
        .post('/api/status-atuals')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update status-atuals', async () => {
    const updatedEntity: StatusAtual = (
      await request(app.getHttpServer())
        .put('/api/status-atuals')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE status-atuals', async () => {
    const deletedEntity: StatusAtual = (
      await request(app.getHttpServer())
        .delete('/api/status-atuals/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import MotivoPs from '../src/domain/motivo-ps.entity';
import { MotivoPsService } from '../src/service/motivo-ps.service';

describe('MotivoPs Controller', () => {
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
      .overrideProvider(MotivoPsService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all motivo-ps ', async () => {
    const getEntities: MotivoPs[] = (
      await request(app.getHttpServer())
        .get('/api/motivo-ps')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET motivo-ps by id', async () => {
    const getEntity: MotivoPs = (
      await request(app.getHttpServer())
        .get('/api/motivo-ps/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create motivo-ps', async () => {
    const createdEntity: MotivoPs = (
      await request(app.getHttpServer())
        .post('/api/motivo-ps')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update motivo-ps', async () => {
    const updatedEntity: MotivoPs = (
      await request(app.getHttpServer())
        .put('/api/motivo-ps')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE motivo-ps', async () => {
    const deletedEntity: MotivoPs = (
      await request(app.getHttpServer())
        .delete('/api/motivo-ps/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});

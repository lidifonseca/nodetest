import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import ProfissionalPush from '../src/domain/profissional-push.entity';
import { ProfissionalPushService } from '../src/service/profissional-push.service';

describe('ProfissionalPush Controller', () => {
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
      .overrideProvider(ProfissionalPushService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all profissional-pushes ', async () => {
    const getEntities: ProfissionalPush[] = (
      await request(app.getHttpServer())
        .get('/api/profissional-pushes')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET profissional-pushes by id', async () => {
    const getEntity: ProfissionalPush = (
      await request(app.getHttpServer())
        .get('/api/profissional-pushes/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create profissional-pushes', async () => {
    const createdEntity: ProfissionalPush = (
      await request(app.getHttpServer())
        .post('/api/profissional-pushes')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update profissional-pushes', async () => {
    const updatedEntity: ProfissionalPush = (
      await request(app.getHttpServer())
        .put('/api/profissional-pushes')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE profissional-pushes', async () => {
    const deletedEntity: ProfissionalPush = (
      await request(app.getHttpServer())
        .delete('/api/profissional-pushes/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});

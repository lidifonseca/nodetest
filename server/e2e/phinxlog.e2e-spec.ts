import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import Phinxlog from '../src/domain/phinxlog.entity';
import { PhinxlogService } from '../src/service/phinxlog.service';

describe('Phinxlog Controller', () => {
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
      .overrideProvider(PhinxlogService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all phinxlogs ', async () => {
    const getEntities: Phinxlog[] = (
      await request(app.getHttpServer())
        .get('/api/phinxlogs')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET phinxlogs by id', async () => {
    const getEntity: Phinxlog = (
      await request(app.getHttpServer())
        .get('/api/phinxlogs/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create phinxlogs', async () => {
    const createdEntity: Phinxlog = (
      await request(app.getHttpServer())
        .post('/api/phinxlogs')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update phinxlogs', async () => {
    const updatedEntity: Phinxlog = (
      await request(app.getHttpServer())
        .put('/api/phinxlogs')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE phinxlogs', async () => {
    const deletedEntity: Phinxlog = (
      await request(app.getHttpServer())
        .delete('/api/phinxlogs/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});

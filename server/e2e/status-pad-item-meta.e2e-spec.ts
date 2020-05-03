import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import StatusPadItemMeta from '../src/domain/status-pad-item-meta.entity';
import { StatusPadItemMetaService } from '../src/service/status-pad-item-meta.service';

describe('StatusPadItemMeta Controller', () => {
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
      .overrideProvider(StatusPadItemMetaService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all status-pad-item-metas ', async () => {
    const getEntities: StatusPadItemMeta[] = (
      await request(app.getHttpServer())
        .get('/api/status-pad-item-metas')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET status-pad-item-metas by id', async () => {
    const getEntity: StatusPadItemMeta = (
      await request(app.getHttpServer())
        .get('/api/status-pad-item-metas/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create status-pad-item-metas', async () => {
    const createdEntity: StatusPadItemMeta = (
      await request(app.getHttpServer())
        .post('/api/status-pad-item-metas')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update status-pad-item-metas', async () => {
    const updatedEntity: StatusPadItemMeta = (
      await request(app.getHttpServer())
        .put('/api/status-pad-item-metas')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE status-pad-item-metas', async () => {
    const deletedEntity: StatusPadItemMeta = (
      await request(app.getHttpServer())
        .delete('/api/status-pad-item-metas/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});

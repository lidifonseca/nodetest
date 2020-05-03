import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import CidXPtaNovoPadItemIndi from '../src/domain/cid-x-pta-novo-pad-item-indi.entity';
import { CidXPtaNovoPadItemIndiService } from '../src/service/cid-x-pta-novo-pad-item-indi.service';

describe('CidXPtaNovoPadItemIndi Controller', () => {
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
      .overrideProvider(CidXPtaNovoPadItemIndiService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all cid-x-pta-novo-pad-item-indis ', async () => {
    const getEntities: CidXPtaNovoPadItemIndi[] = (
      await request(app.getHttpServer())
        .get('/api/cid-x-pta-novo-pad-item-indis')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET cid-x-pta-novo-pad-item-indis by id', async () => {
    const getEntity: CidXPtaNovoPadItemIndi = (
      await request(app.getHttpServer())
        .get('/api/cid-x-pta-novo-pad-item-indis/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create cid-x-pta-novo-pad-item-indis', async () => {
    const createdEntity: CidXPtaNovoPadItemIndi = (
      await request(app.getHttpServer())
        .post('/api/cid-x-pta-novo-pad-item-indis')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update cid-x-pta-novo-pad-item-indis', async () => {
    const updatedEntity: CidXPtaNovoPadItemIndi = (
      await request(app.getHttpServer())
        .put('/api/cid-x-pta-novo-pad-item-indis')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE cid-x-pta-novo-pad-item-indis', async () => {
    const deletedEntity: CidXPtaNovoPadItemIndi = (
      await request(app.getHttpServer())
        .delete('/api/cid-x-pta-novo-pad-item-indis/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});

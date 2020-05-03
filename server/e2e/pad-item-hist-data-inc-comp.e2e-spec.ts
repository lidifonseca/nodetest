import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import PadItemHistDataIncComp from '../src/domain/pad-item-hist-data-inc-comp.entity';
import { PadItemHistDataIncCompService } from '../src/service/pad-item-hist-data-inc-comp.service';

describe('PadItemHistDataIncComp Controller', () => {
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
      .overrideProvider(PadItemHistDataIncCompService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all pad-item-hist-data-inc-comps ', async () => {
    const getEntities: PadItemHistDataIncComp[] = (
      await request(app.getHttpServer())
        .get('/api/pad-item-hist-data-inc-comps')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET pad-item-hist-data-inc-comps by id', async () => {
    const getEntity: PadItemHistDataIncComp = (
      await request(app.getHttpServer())
        .get('/api/pad-item-hist-data-inc-comps/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create pad-item-hist-data-inc-comps', async () => {
    const createdEntity: PadItemHistDataIncComp = (
      await request(app.getHttpServer())
        .post('/api/pad-item-hist-data-inc-comps')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update pad-item-hist-data-inc-comps', async () => {
    const updatedEntity: PadItemHistDataIncComp = (
      await request(app.getHttpServer())
        .put('/api/pad-item-hist-data-inc-comps')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE pad-item-hist-data-inc-comps', async () => {
    const deletedEntity: PadItemHistDataIncComp = (
      await request(app.getHttpServer())
        .delete('/api/pad-item-hist-data-inc-comps/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});

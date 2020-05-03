import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import PadItemAlerta from '../src/domain/pad-item-alerta.entity';
import { PadItemAlertaService } from '../src/service/pad-item-alerta.service';

describe('PadItemAlerta Controller', () => {
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
      .overrideProvider(PadItemAlertaService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all pad-item-alertas ', async () => {
    const getEntities: PadItemAlerta[] = (
      await request(app.getHttpServer())
        .get('/api/pad-item-alertas')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET pad-item-alertas by id', async () => {
    const getEntity: PadItemAlerta = (
      await request(app.getHttpServer())
        .get('/api/pad-item-alertas/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create pad-item-alertas', async () => {
    const createdEntity: PadItemAlerta = (
      await request(app.getHttpServer())
        .post('/api/pad-item-alertas')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update pad-item-alertas', async () => {
    const updatedEntity: PadItemAlerta = (
      await request(app.getHttpServer())
        .put('/api/pad-item-alertas')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE pad-item-alertas', async () => {
    const deletedEntity: PadItemAlerta = (
      await request(app.getHttpServer())
        .delete('/api/pad-item-alertas/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});

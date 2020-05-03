import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import PadItemCepRecusado from '../src/domain/pad-item-cep-recusado.entity';
import { PadItemCepRecusadoService } from '../src/service/pad-item-cep-recusado.service';

describe('PadItemCepRecusado Controller', () => {
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
      .overrideProvider(PadItemCepRecusadoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all pad-item-cep-recusados ', async () => {
    const getEntities: PadItemCepRecusado[] = (
      await request(app.getHttpServer())
        .get('/api/pad-item-cep-recusados')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET pad-item-cep-recusados by id', async () => {
    const getEntity: PadItemCepRecusado = (
      await request(app.getHttpServer())
        .get('/api/pad-item-cep-recusados/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create pad-item-cep-recusados', async () => {
    const createdEntity: PadItemCepRecusado = (
      await request(app.getHttpServer())
        .post('/api/pad-item-cep-recusados')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update pad-item-cep-recusados', async () => {
    const updatedEntity: PadItemCepRecusado = (
      await request(app.getHttpServer())
        .put('/api/pad-item-cep-recusados')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE pad-item-cep-recusados', async () => {
    const deletedEntity: PadItemCepRecusado = (
      await request(app.getHttpServer())
        .delete('/api/pad-item-cep-recusados/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});

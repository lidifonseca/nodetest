import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import GeoPanico from '../src/domain/geo-panico.entity';
import { GeoPanicoService } from '../src/service/geo-panico.service';

describe('GeoPanico Controller', () => {
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
      .overrideProvider(GeoPanicoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all geo-panicos ', async () => {
    const getEntities: GeoPanico[] = (
      await request(app.getHttpServer())
        .get('/api/geo-panicos')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET geo-panicos by id', async () => {
    const getEntity: GeoPanico = (
      await request(app.getHttpServer())
        .get('/api/geo-panicos/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create geo-panicos', async () => {
    const createdEntity: GeoPanico = (
      await request(app.getHttpServer())
        .post('/api/geo-panicos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update geo-panicos', async () => {
    const updatedEntity: GeoPanico = (
      await request(app.getHttpServer())
        .put('/api/geo-panicos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE geo-panicos', async () => {
    const deletedEntity: GeoPanico = (
      await request(app.getHttpServer())
        .delete('/api/geo-panicos/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import TipoMatMed from '../src/domain/tipo-mat-med.entity';
import { TipoMatMedService } from '../src/service/tipo-mat-med.service';

describe('TipoMatMed Controller', () => {
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
      .overrideProvider(TipoMatMedService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all tipo-mat-meds ', async () => {
    const getEntities: TipoMatMed[] = (
      await request(app.getHttpServer())
        .get('/api/tipo-mat-meds')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET tipo-mat-meds by id', async () => {
    const getEntity: TipoMatMed = (
      await request(app.getHttpServer())
        .get('/api/tipo-mat-meds/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create tipo-mat-meds', async () => {
    const createdEntity: TipoMatMed = (
      await request(app.getHttpServer())
        .post('/api/tipo-mat-meds')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update tipo-mat-meds', async () => {
    const updatedEntity: TipoMatMed = (
      await request(app.getHttpServer())
        .put('/api/tipo-mat-meds')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE tipo-mat-meds', async () => {
    const deletedEntity: TipoMatMed = (
      await request(app.getHttpServer())
        .delete('/api/tipo-mat-meds/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});

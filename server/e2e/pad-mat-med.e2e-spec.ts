import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import PadMatMed from '../src/domain/pad-mat-med.entity';
import { PadMatMedService } from '../src/service/pad-mat-med.service';

describe('PadMatMed Controller', () => {
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
      .overrideProvider(PadMatMedService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all pad-mat-meds ', async () => {
    const getEntities: PadMatMed[] = (
      await request(app.getHttpServer())
        .get('/api/pad-mat-meds')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET pad-mat-meds by id', async () => {
    const getEntity: PadMatMed = (
      await request(app.getHttpServer())
        .get('/api/pad-mat-meds/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create pad-mat-meds', async () => {
    const createdEntity: PadMatMed = (
      await request(app.getHttpServer())
        .post('/api/pad-mat-meds')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update pad-mat-meds', async () => {
    const updatedEntity: PadMatMed = (
      await request(app.getHttpServer())
        .put('/api/pad-mat-meds')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE pad-mat-meds', async () => {
    const deletedEntity: PadMatMed = (
      await request(app.getHttpServer())
        .delete('/api/pad-mat-meds/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import PadCsv from '../src/domain/pad-csv.entity';
import { PadCsvService } from '../src/service/pad-csv.service';

describe('PadCsv Controller', () => {
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
      .overrideProvider(PadCsvService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all pad-csvs ', async () => {
    const getEntities: PadCsv[] = (
      await request(app.getHttpServer())
        .get('/api/pad-csvs')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET pad-csvs by id', async () => {
    const getEntity: PadCsv = (
      await request(app.getHttpServer())
        .get('/api/pad-csvs/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create pad-csvs', async () => {
    const createdEntity: PadCsv = (
      await request(app.getHttpServer())
        .post('/api/pad-csvs')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update pad-csvs', async () => {
    const updatedEntity: PadCsv = (
      await request(app.getHttpServer())
        .put('/api/pad-csvs')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE pad-csvs', async () => {
    const deletedEntity: PadCsv = (
      await request(app.getHttpServer())
        .delete('/api/pad-csvs/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});

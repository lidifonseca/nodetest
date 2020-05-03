import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import CepbrEndereco from '../src/domain/cepbr-endereco.entity';
import { CepbrEnderecoService } from '../src/service/cepbr-endereco.service';

describe('CepbrEndereco Controller', () => {
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
      .overrideProvider(CepbrEnderecoService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all cepbr-enderecos ', async () => {
    const getEntities: CepbrEndereco[] = (
      await request(app.getHttpServer())
        .get('/api/cepbr-enderecos')
        .expect(200)
    ).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET cepbr-enderecos by id', async () => {
    const getEntity: CepbrEndereco = (
      await request(app.getHttpServer())
        .get('/api/cepbr-enderecos/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create cepbr-enderecos', async () => {
    const createdEntity: CepbrEndereco = (
      await request(app.getHttpServer())
        .post('/api/cepbr-enderecos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update cepbr-enderecos', async () => {
    const updatedEntity: CepbrEndereco = (
      await request(app.getHttpServer())
        .put('/api/cepbr-enderecos')
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE cepbr-enderecos', async () => {
    const deletedEntity: CepbrEndereco = (
      await request(app.getHttpServer())
        .delete('/api/cepbr-enderecos/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});

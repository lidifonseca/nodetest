import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './module/auth.module';
import { ormconfig } from './orm.config';
import { PesquisaModule } from './module/pesquisa.module';
import { EstadoModule } from './module/estado.module';
import { ComarcaModule } from './module/comarca.module';
import { ProcessoModule } from './module/processo.module';
import { ParteModule } from './module/parte.module';
import { MovimentacaoModule } from './module/movimentacao.module';
import { PeticaoModule } from './module/peticao.module';
import { IncidenteModule } from './module/incidente.module';
import { ApensoModule } from './module/apenso.module';
import { AudienciaModule } from './module/audiencia.module';
import { HistoricoClaseModule } from './module/historico-clase.module';
// jhipster-needle-add-entity-module-to-main-import - JHipster will import entity modules here, do not remove
// jhipster-needle-add-controller-module-to-main-import - JHipster will import controller modules here, do not remove
// jhipster-needle-add-service-module-to-main-import - JHipster will import service modules here, do not remove

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    AuthModule,
    PesquisaModule,
    EstadoModule,
    ComarcaModule,
    ProcessoModule,
    ParteModule,
    MovimentacaoModule,
    PeticaoModule,
    IncidenteModule,
    ApensoModule,
    AudienciaModule,
    HistoricoClaseModule
    // jhipster-needle-add-entity-module-to-main - JHipster will add entity modules here, do not remove
  ],
  controllers: [
    // jhipster-needle-add-controller-module-to-main - JHipster will add controller modules here, do not remove
  ],
  providers: [
    // jhipster-needle-add-service-module-to-main - JHipster will add service modules here, do not remove
  ]
})
export class AppModule {}

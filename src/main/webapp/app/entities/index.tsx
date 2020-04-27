import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Pesquisa from './pesquisa';
import Estado from './estado';
import Comarca from './comarca';
import Processo from './processo';
import Parte from './parte';
import Movimentacao from './movimentacao';
import Peticao from './peticao';
import Incidente from './incidente';
import Apenso from './apenso';
import Audiencia from './audiencia';
import HistoricoClase from './historico-clase';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}pesquisa`} component={Pesquisa} />
      <ErrorBoundaryRoute path={`${match.url}estado`} component={Estado} />
      <ErrorBoundaryRoute path={`${match.url}comarca`} component={Comarca} />
      <ErrorBoundaryRoute path={`${match.url}processo`} component={Processo} />
      <ErrorBoundaryRoute path={`${match.url}parte`} component={Parte} />
      <ErrorBoundaryRoute path={`${match.url}movimentacao`} component={Movimentacao} />
      <ErrorBoundaryRoute path={`${match.url}peticao`} component={Peticao} />
      <ErrorBoundaryRoute path={`${match.url}incidente`} component={Incidente} />
      <ErrorBoundaryRoute path={`${match.url}apenso`} component={Apenso} />
      <ErrorBoundaryRoute path={`${match.url}audiencia`} component={Audiencia} />
      <ErrorBoundaryRoute path={`${match.url}historico-clase`} component={HistoricoClase} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;

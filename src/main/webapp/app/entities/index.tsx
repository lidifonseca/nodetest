import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Processo from './processo';
import Parte from './parte';
import Movimentacao from './movimentacao';
import Peticao from './peticao';
import Incidente from './incidente';
import Apenso from './apenso';
import Audiencia from './audiencia';
import HistoricoClase from './historico-clase';
import Cliente from './cliente';
import Pesquisa from './pesquisa';
import Estado from './estado';
import Comarca from './comarca';
import PageNotFound from 'app/shared/error/page-not-found';
import Paciente from './paciente';
import Cidade from './cidade';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}processo`} component={Processo} />
      <ErrorBoundaryRoute path={`${match.url}pesquisa`} component={Pesquisa} />
      <ErrorBoundaryRoute path={`${match.url}paciente`} component={Paciente} />
      <ErrorBoundaryRoute path={`${match.url}cidade`} component={Cidade} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      <ErrorBoundaryRoute component={PageNotFound} />
    </Switch>
  </div>
);

export default Routes;

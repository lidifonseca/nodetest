import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProfissionalDispositivoAtual from './profissional-dispositivo-atual';
import ProfissionalDispositivoAtualDetail from './profissional-dispositivo-atual-detail';
import ProfissionalDispositivoAtualRelatorioCSV from './relatorio/profissional-dispositivo-atual.csv';
import ProfissionalDispositivoAtualUpdate from './profissional-dispositivo-atual-update';
import ProfissionalDispositivoAtualDeleteDialog from './profissional-dispositivo-atual-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={ProfissionalDispositivoAtualRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProfissionalDispositivoAtualUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProfissionalDispositivoAtualUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProfissionalDispositivoAtualDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProfissionalDispositivoAtual} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ProfissionalDispositivoAtualDeleteDialog} />
  </>
);

export default Routes;

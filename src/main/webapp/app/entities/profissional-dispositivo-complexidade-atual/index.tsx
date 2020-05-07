import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProfissionalDispositivoComplexidadeAtual from './profissional-dispositivo-complexidade-atual';
import ProfissionalDispositivoComplexidadeAtualDetail from './profissional-dispositivo-complexidade-atual-detail';
import ProfissionalDispositivoComplexidadeAtualRelatorioCSV from './relatorio/profissional-dispositivo-complexidade-atual.csv';
import ProfissionalDispositivoComplexidadeAtualUpdate from './profissional-dispositivo-complexidade-atual-update';
import ProfissionalDispositivoComplexidadeAtualDeleteDialog from './profissional-dispositivo-complexidade-atual-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={ProfissionalDispositivoComplexidadeAtualRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProfissionalDispositivoComplexidadeAtualUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProfissionalDispositivoComplexidadeAtualUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProfissionalDispositivoComplexidadeAtualDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProfissionalDispositivoComplexidadeAtual} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ProfissionalDispositivoComplexidadeAtualDeleteDialog} />
  </>
);

export default Routes;

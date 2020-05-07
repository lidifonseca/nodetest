import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProfissionalDispositivoComplexidade from './profissional-dispositivo-complexidade';
import ProfissionalDispositivoComplexidadeDetail from './profissional-dispositivo-complexidade-detail';
import ProfissionalDispositivoComplexidadeRelatorioCSV from './relatorio/profissional-dispositivo-complexidade.csv';
import ProfissionalDispositivoComplexidadeUpdate from './profissional-dispositivo-complexidade-update';
import ProfissionalDispositivoComplexidadeDeleteDialog from './profissional-dispositivo-complexidade-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={ProfissionalDispositivoComplexidadeRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProfissionalDispositivoComplexidadeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProfissionalDispositivoComplexidadeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProfissionalDispositivoComplexidadeDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProfissionalDispositivoComplexidade} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ProfissionalDispositivoComplexidadeDeleteDialog} />
  </>
);

export default Routes;

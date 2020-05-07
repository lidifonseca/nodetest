import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AlertasResultadosEsperados from './alertas-resultados-esperados';
import AlertasResultadosEsperadosDetail from './alertas-resultados-esperados-detail';
import AlertasResultadosEsperadosRelatorioCSV from './relatorio/alertas-resultados-esperados.csv';
import AlertasResultadosEsperadosUpdate from './alertas-resultados-esperados-update';
import AlertasResultadosEsperadosDeleteDialog from './alertas-resultados-esperados-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={AlertasResultadosEsperadosRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AlertasResultadosEsperadosUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AlertasResultadosEsperadosUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AlertasResultadosEsperadosDetail} />
      <ErrorBoundaryRoute path={match.url} component={AlertasResultadosEsperados} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AlertasResultadosEsperadosDeleteDialog} />
  </>
);

export default Routes;

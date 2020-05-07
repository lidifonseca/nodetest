import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Tela from './tela';
import TelaDetail from './tela-detail';
import TelaRelatorioCSV from './relatorio/tela.csv';
import TelaUpdate from './tela-update';
import TelaDeleteDialog from './tela-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={TelaRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TelaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TelaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TelaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Tela} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TelaDeleteDialog} />
  </>
);

export default Routes;

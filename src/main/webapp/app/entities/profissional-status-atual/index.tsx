import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProfissionalStatusAtual from './profissional-status-atual';
import ProfissionalStatusAtualDetail from './profissional-status-atual-detail';
import ProfissionalStatusAtualUpdate from './profissional-status-atual-update';
import ProfissionalStatusAtualDeleteDialog from './profissional-status-atual-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProfissionalStatusAtualUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProfissionalStatusAtualUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProfissionalStatusAtualDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProfissionalStatusAtual} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ProfissionalStatusAtualDeleteDialog} />
  </>
);

export default Routes;

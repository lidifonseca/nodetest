import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Respostas from './respostas';
import RespostasDetail from './respostas-detail';
import RespostasUpdate from './respostas-update';
import RespostasDeleteDialog from './respostas-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RespostasUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RespostasUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RespostasDetail} />
      <ErrorBoundaryRoute path={match.url} component={Respostas} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={RespostasDeleteDialog} />
  </>
);

export default Routes;

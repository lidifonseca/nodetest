import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Peticao from './peticao';
import PeticaoDetail from './peticao-detail';
import PeticaoUpdate from './peticao-update';
import PeticaoDeleteDialog from './peticao-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PeticaoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PeticaoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PeticaoDetail} />
      <ErrorBoundaryRoute path={match.url} component={Peticao} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PeticaoDeleteDialog} />
  </>
);

export default Routes;

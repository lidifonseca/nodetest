import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PadItemAlerta from './pad-item-alerta';
import PadItemAlertaDetail from './pad-item-alerta-detail';
import PadItemAlertaUpdate from './pad-item-alerta-update';
import PadItemAlertaDeleteDialog from './pad-item-alerta-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PadItemAlertaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PadItemAlertaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PadItemAlertaDetail} />
      <ErrorBoundaryRoute path={match.url} component={PadItemAlerta} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PadItemAlertaDeleteDialog} />
  </>
);

export default Routes;

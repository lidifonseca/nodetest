import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PadPtaTemp from './pad-pta-temp';
import PadPtaTempDetail from './pad-pta-temp-detail';
import PadPtaTempUpdate from './pad-pta-temp-update';
import PadPtaTempDeleteDialog from './pad-pta-temp-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PadPtaTempUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PadPtaTempUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PadPtaTempDetail} />
      <ErrorBoundaryRoute path={match.url} component={PadPtaTemp} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PadPtaTempDeleteDialog} />
  </>
);

export default Routes;

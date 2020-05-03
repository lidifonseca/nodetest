import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PadItemSorteioFeito from './pad-item-sorteio-feito';
import PadItemSorteioFeitoDetail from './pad-item-sorteio-feito-detail';
import PadItemSorteioFeitoUpdate from './pad-item-sorteio-feito-update';
import PadItemSorteioFeitoDeleteDialog from './pad-item-sorteio-feito-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PadItemSorteioFeitoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PadItemSorteioFeitoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PadItemSorteioFeitoDetail} />
      <ErrorBoundaryRoute path={match.url} component={PadItemSorteioFeito} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PadItemSorteioFeitoDeleteDialog} />
  </>
);

export default Routes;

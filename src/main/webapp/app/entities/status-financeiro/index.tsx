import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import StatusFinanceiro from './status-financeiro';
import StatusFinanceiroDetail from './status-financeiro-detail';
import StatusFinanceiroUpdate from './status-financeiro-update';
import StatusFinanceiroDeleteDialog from './status-financeiro-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={StatusFinanceiroUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={StatusFinanceiroUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={StatusFinanceiroDetail} />
      <ErrorBoundaryRoute path={match.url} component={StatusFinanceiro} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={StatusFinanceiroDeleteDialog} />
  </>
);

export default Routes;

import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import GrauParentesco from './grau-parentesco';
import GrauParentescoDetail from './grau-parentesco-detail';
import GrauParentescoRelatorioCSV from './relatorio/grau-parentesco.csv';
import GrauParentescoUpdate from './grau-parentesco-update';
import GrauParentescoDeleteDialog from './grau-parentesco-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={GrauParentescoRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={GrauParentescoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={GrauParentescoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={GrauParentescoDetail} />
      <ErrorBoundaryRoute path={match.url} component={GrauParentesco} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={GrauParentescoDeleteDialog} />
  </>
);

export default Routes;

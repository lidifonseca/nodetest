import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ImagemProntuario from './imagem-prontuario';
import ImagemProntuarioDetail from './imagem-prontuario-detail';
import ImagemProntuarioUpdate from './imagem-prontuario-update';
import ImagemProntuarioDeleteDialog from './imagem-prontuario-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ImagemProntuarioUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ImagemProntuarioUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ImagemProntuarioDetail} />
      <ErrorBoundaryRoute path={match.url} component={ImagemProntuario} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ImagemProntuarioDeleteDialog} />
  </>
);

export default Routes;

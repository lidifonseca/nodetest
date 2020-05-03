import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Questionarios from './questionarios';
import QuestionariosDetail from './questionarios-detail';
import QuestionariosUpdate from './questionarios-update';
import QuestionariosDeleteDialog from './questionarios-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={QuestionariosUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={QuestionariosUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={QuestionariosDetail} />
      <ErrorBoundaryRoute path={match.url} component={Questionarios} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={QuestionariosDeleteDialog} />
  </>
);

export default Routes;

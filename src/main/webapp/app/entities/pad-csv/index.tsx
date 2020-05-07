import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PadCsv from './pad-csv';
import PadCsvDetail from './pad-csv-detail';
import PadCsvRelatorioCSV from './relatorio/pad-csv.csv';
import PadCsvUpdate from './pad-csv-update';
import PadCsvDeleteDialog from './pad-csv-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={PadCsvRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PadCsvUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PadCsvUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PadCsvDetail} />
      <ErrorBoundaryRoute path={match.url} component={PadCsv} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={PadCsvDeleteDialog} />
  </>
);

export default Routes;

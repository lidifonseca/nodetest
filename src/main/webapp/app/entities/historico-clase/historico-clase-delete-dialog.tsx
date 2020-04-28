import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IHistoricoClase } from 'app/shared/model/historico-clase.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './historico-clase.reducer';

export interface IHistoricoClaseDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class HistoricoClaseDeleteDialog extends React.Component<IHistoricoClaseDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.historicoClaseEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { historicoClaseEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="tjscrapperApp.historicoClase.delete.question">
          <Translate contentKey="tjscrapperApp.historicoClase.delete.question" interpolate={{ id: historicoClaseEntity.id }}>
            Are you sure you want to delete this HistoricoClase?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="dark" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-historicoClase" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ historicoClase }: IRootState) => ({
  historicoClaseEntity: historicoClase.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoricoClaseDeleteDialog);

import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IVwApiAtendimentosAceite } from 'app/shared/model/vw-api-atendimentos-aceite.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './vw-api-atendimentos-aceite.reducer';

export interface IVwApiAtendimentosAceiteDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class VwApiAtendimentosAceiteDeleteDialog extends React.Component<IVwApiAtendimentosAceiteDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.vwApiAtendimentosAceiteEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { vwApiAtendimentosAceiteEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="generadorApp.vwApiAtendimentosAceite.delete.question">
          <Translate
            contentKey="generadorApp.vwApiAtendimentosAceite.delete.question"
            interpolate={{ id: vwApiAtendimentosAceiteEntity.id }}
          >
            Are you sure you want to delete this VwApiAtendimentosAceite?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-vwApiAtendimentosAceite" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ vwApiAtendimentosAceite }: IRootState) => ({
  vwApiAtendimentosAceiteEntity: vwApiAtendimentosAceite.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VwApiAtendimentosAceiteDeleteDialog);

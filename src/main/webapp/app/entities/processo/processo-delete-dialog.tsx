import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IProcesso } from 'app/shared/model/processo.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './processo.reducer';

export interface IProcessoDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProcessoDeleteDialog extends React.Component<IProcessoDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id, null);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.processoEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { processoEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="tjscrapperApp.processo.delete.question">
          <Translate contentKey="tjscrapperApp.processo.delete.question" interpolate={{ id: processoEntity.id }}>
            Are you sure you want to delete this Processo?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="dark" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-processo" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ processo }: IRootState) => ({
  processoEntity: processo.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProcessoDeleteDialog);

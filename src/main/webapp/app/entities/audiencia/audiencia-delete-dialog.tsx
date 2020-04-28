import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IAudiencia } from 'app/shared/model/audiencia.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './audiencia.reducer';

export interface IAudienciaDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AudienciaDeleteDialog extends React.Component<IAudienciaDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.audienciaEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { audienciaEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="tjscrapperApp.audiencia.delete.question">
          <Translate contentKey="tjscrapperApp.audiencia.delete.question" interpolate={{ id: audienciaEntity.id }}>
            Are you sure you want to delete this Audiencia?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="dark" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-audiencia" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ audiencia }: IRootState) => ({
  audienciaEntity: audiencia.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AudienciaDeleteDialog);

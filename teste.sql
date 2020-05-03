categoria_contrato              CONTRATO varchar(255);
especialidade                   DESCRICAO varchar(255);
log_pac_acesso                  INFOR_ACESSO varchar(255);
paciente                        OBSERVACAO varchar(255);
paciente                        DETALHES varchar(255);
paciente_diario                 HISTORICO varchar(255);
paciente_prontuario             O_QUE varchar(255);
paciente_prontuario             RESULTADO varchar(255);
paciente_status_atual           OBSERVACAO varchar(255);
pad_item                        OBSERVACAO varchar(255);
pad_item_meta                   UNIDADE_MEDIDA_ID int(11);
pad_item_meta                   DATA_LIMITE timestamp;
pad_item_resultado              RESULTADO varchar(255);
profissional                    OBS varchar(255);
profissional_new                OBS varchar(255);
profissional_status_atual       OBS varchar(255);
profissional_status_atual_new   OBS varchar(255);
termos_uso                      TERMOS_USO varchar(255);
usuario_acao                    DESCRICAO varchar(255);


pad_item_resultado              USUARIO_ID int(11);
pad_item_meta                   ATENDIMENTO_ID int(11);
pad_item                        CATEGORIA_ID int(11);
licao_casa                      HORA_INICIO timestamp;


ALTER TABLE `pad_item_temp`                   ADD COLUMN CID_X_PTA_NOVO_ID int(11);
ALTER TABLE `pad_item_temp`                   ADD COLUMN CATEGORIA_ID int(11);
ALTER TABLE `pad_pta_temp`                    ADD COLUMN CID_X_PTA_NOVO_ID int(11);
ALTER TABLE `respostas_questionarios`         ADD COLUMN QUESTIONARIO_ID int(11);
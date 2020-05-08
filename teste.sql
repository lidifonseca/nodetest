CREATE TABLE `tb_indicadores` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(145) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1

CREATE TABLE `tb_indicadores_valores` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `SEXO` varchar(45) DEFAULT NULL,
  `VL_MINIMO` varchar(45) DEFAULT NULL,
  `VL_MAXIMO` varchar(45) DEFAULT NULL,
  `UNIDADE_MEDIDA` varchar(45) DEFAULT NULL,
  `IDADE_MINIMA` varchar(45) DEFAULT NULL,
  `IDADE_MAXIMA` varchar(45) DEFAULT NULL,
  `TB_INDICADORES_ID` int(11) NOT NULL,
  PRIMARY KEY (`ID`,`TB_INDICADORES_ID`),
  KEY `fk_TB_INDICADORES_VALORES_TB_INDICADORES1_idx` (`TB_INDICADORES_ID`),
  CONSTRAINT `fk_TB_INDICADORES_VALORES_TB_INDICADORES1` FOREIGN KEY (`TB_INDICADORES_ID`) REFERENCES `tb_indicadores` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1



SELECT concat('ALTER TABLE nodetest.',TABLE_NAME,' ADD ID_USUARIO bigint(20) NULL;') FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA='nodetest' AND TABLE_NAME not in(
SELECT TABLE_NAME FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA='nodetest' AND COLUMN_NAME='ID_USUARIO'
) group by TABLE_NAME
union 
SELECT concat('ALTER TABLE nodetest.',TABLE_NAME,' ADD DATA_POST timestamp NULL;') FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA='nodetest' AND TABLE_NAME not in(
SELECT TABLE_NAME FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA='nodetest' AND COLUMN_NAME='DATA_POST'
) group by TABLE_NAME
union 
SELECT concat('ALTER TABLE nodetest.',TABLE_NAME,' ADD ID_LAST_USUARIO bigint(20) NULL;') FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA='nodetest' AND TABLE_NAME not in(
SELECT TABLE_NAME FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA='nodetest' AND COLUMN_NAME='ID_LAST_USUARIO'
) group by TABLE_NAME
union 
SELECT concat('ALTER TABLE nodetest.',TABLE_NAME,' ADD LAST_DATA_MODIFICADO timestamp NULL;') FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA='nodetest' AND TABLE_NAME not in(
SELECT TABLE_NAME FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA='nodetest' AND COLUMN_NAME='LAST_DATA_MODIFICADO'
) group by TABLE_NAME;


/* UNIDADES */

INSERT INTO nodetest_novo.status_atual 
(id,createdBy,createdDate,lastModifiedBy,lastModifiedDate,status_atual,style_label)
SELECT id, '1' as createdBy, data_post as createdDate, '1' as lastModifiedBy, data_post as lastModifiedDate,
status_atual,style_label
FROM concierge_db.status_atual;


INSERT INTO nodetest_novo.paciente_status_atual 
(id,createdBy,createdDate,lastModifiedBy,lastModifiedDate,
data_status,ativo,id_usuario,observacao,pacienteId,statusId)
SELECT id, '1' as createdBy, data_post as createdDate, '1' as lastModifiedBy, data_post as lastModifiedDate,
data_status,ativo,id_usuario,observacao,ID_PACIENTE,ID_STATUS_ATUAL
FROM concierge_db.paciente_status_atual;



/* PACIENTE */

INSERT INTO nodetest_novo.paciente 
(id,createdBy,createdDate,lastModifiedBy,lastModifiedDate,id_unidade,id_franquia,id_cidade,id_cidade_familiar,id_grau_parentesco,senha,nome,email,cpf,rg,registro,nascimento,sexo,telefone,telefone_2,celular,celular_1,cep,endereco,numero,complemento,bairro,cidade,uf,latitude,longitude,responsavel_familiar,email_familiar,cpf_familiar,rg_familiar,nascimento_familiar,sexo_familiar,telefone_familiar,telefone_2_familiar,celular_familiar,celular_2_familiar,cep_familiar,endereco_familiar,numero_familiar,complemento_familiar,bairro_familiar,cidade_familiar,uf_familiar,latitude_familiar,longitude_familiar,observacao,aph,nivel_complexidade,passagem_ps,obs_ps,passagem_internacao,obs_internacao,custo_total,observacao_familiar,mesmo_endereco,acesso_familiar,com_responsavel,cadastro_completo,ativo,detalhes,tipohospital,liminar,expo_token,profissional_pref,senha_chat)
SELECT id, '1' as createdBy, data_post as createdDate, '1' as lastModifiedBy, data_post as lastModifiedDate,
id_unidade, id_franquia, id_cidade, id_cidade_familiar, id_grau_parentesco, senha, nome, email, cpf, rg, registro, nascimento, sexo, telefone, telefone2 as telefone_2, celular, celular1 as celular_1, cep, endereco, numero, complemento, bairro, cidade, uf, latitude, longitude, responsavel_familiar, email_familiar, cpf_familiar, rg_familiar, nascimento_familiar, sexo_familiar, telefone_familiar, 
telefone2_familiar as telefone_2_familiar, celular_familiar, celular2_familiar as celular_2_familiar, cep_familiar, endereco_familiar, numero_familiar, complemento_familiar, bairro_familiar, cidade_familiar, uf_familiar, latitude_familiar, longitude_familiar, observacao, aph, nivel_complexidade, passagem_ps, obs_ps, passagem_internacao, obs_internacao, custo_total, observacao_familiar, mesmo_endereco, acesso_familiar, com_responsavel, cadastro_completo, ativo, detalhes, tipohospital, liminar, expo_token, profissional_pref, senha_chat
FROM concierge_db.paciente;


INSERT INTO nodetest_novo.paciente_arquivo 
(id, createdBy, createdDate, lastModifiedBy, lastModifiedDate, id_paciente, arquivo, ativo)
SELECT id, '1' as createdBy, data_post as createdDate, '1' as lastModifiedBy, data_post as lastModifiedDate,
id_paciente, arquivo, ativo
FROM concierge_db.paciente_arquivo;






/* OPERADORA */

INSERT INTO nodetest_novo.tipo_operadora 
(id, createdBy, createdDate, lastModifiedBy, lastModifiedDate, tipo, ativo)
SELECT id, '1' as createdBy, data_post as createdDate, '1' as lastModifiedBy, data_post as lastModifiedDate,
tipo, ativo
FROM concierge_db.tipo_operadora;


INSERT INTO nodetest_novo.operadora 
(id, createdBy, createdDate, lastModifiedBy, lastModifiedDate, nome_fantasia, razao_social, cnpj, ie, site, ativo, id_unidade, endereco, contato_central_atendimento, email_central_atendimento, nome_contato_comercial, contato_comercial, email_comercial, nome_contato_financeiro, contato_financeiro, email_financeiro, id_tipo_operadora)
SELECT id, '1' as createdBy, data_post as createdDate, '1' as lastModifiedBy, data_post as lastModifiedDate,
nome_fantasia, razao_social, cnpj, ie, site, ativo, id_unidade, endereco, contato_central_atendimento, email_central_atendimento, nome_contato_comercial, contato_comercial, email_comercial, nome_contato_financeiro, contato_financeiro, email_financeiro, id_tipo_operadora
FROM concierge_db.operadora;
import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import PacienteArquivo from '../../domain/paciente-arquivo.entity';
import { PacienteArquivoService } from '../../service/paciente-arquivo.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/paciente-arquivos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('paciente-arquivos')
export class PacienteArquivoController {
  logger = new Logger('PacienteArquivoController');

  constructor(private readonly pacienteArquivoService: PacienteArquivoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PacienteArquivo
  })
  async getAll(@Req() req: Request): Promise<PacienteArquivo[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.pacienteArquivoService.findAndCount(
      {
        skip: +pageRequest.page * pageRequest.size,
        take: +pageRequest.size,
        order: pageRequest.sort.asOrder()
      },
      filters
    );
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: PacienteArquivo
  })
  async getOne(@Param('id') id: string): Promise<PacienteArquivo> {
    return await this.pacienteArquivoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create pacienteArquivo' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PacienteArquivo
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() pacienteArquivo: PacienteArquivo): Promise<PacienteArquivo> {
    const fs = require('fs');
    const re = /(?:\.([^.]+))?$/;

    const arquivoOldName = pacienteArquivo.arquivo;
    const arquivoBase64 = req.body.arquivoBase64;
    const arquivoFileName = req.body.arquivoFileName;
    const arquivoBDName =
      'arquivos/paciente-arquivos/' +
      Math.random()
        .toString(36)
        .substr(2) +
      Math.random()
        .toString(36)
        .substr(2) +
      '.' +
      re.exec(arquivoFileName)[1];
    await fs.mkdir('arquivos/paciente-arquivos/', { recursive: true }, err => {
      if (err) console.log(err);
      else {
        pacienteArquivo.arquivo = '/' + arquivoBDName;
        require('fs').writeFile(arquivoBDName, arquivoBase64, 'base64', function(err) {
          console.log(err);
        });
      }
    });

    console.info(pacienteArquivo);
    const created = await this.pacienteArquivoService.save(pacienteArquivo);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacienteArquivo', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update pacienteArquivo' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PacienteArquivo
  })
  async put(@Req() req: Request, @Body() pacienteArquivo: PacienteArquivo): Promise<PacienteArquivo> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacienteArquivo', pacienteArquivo.id);

    const fs = require('fs');
    const re = /(?:\.([^.]+))?$/;

    const arquivoOldName = pacienteArquivo.arquivo;
    const arquivoBase64 = req.body.arquivoBase64;
    const arquivoFileName = req.body.arquivoFileName;
    const arquivoBDName =
      'arquivos/paciente-arquivos/' +
      Math.random()
        .toString(36)
        .substr(2) +
      Math.random()
        .toString(36)
        .substr(2) +
      '.' +
      re.exec(arquivoFileName)[1];
    await fs.mkdir('arquivos/paciente-arquivos/', { recursive: true }, err => {
      if (err) console.log(err);
      else {
        fs.stat(arquivoOldName.replace(/^\/+|\/+$/g, ''), function(err, stats) {
          console.log(stats); //here we got all information of file in stats variable
          if (err) return console.log(err);
          fs.unlink(arquivoOldName.replace(/^\/+|\/+$/g, ''), function(err) {
            if (err) return console.error(err);
            console.log('file deleted successfully');
          });
        });
        pacienteArquivo.arquivo = '/' + arquivoBDName;
        require('fs').writeFile(arquivoBDName, arquivoBase64, 'base64', function(err) {
          console.log(err);
        });
      }
    });

    return await this.pacienteArquivoService.update(pacienteArquivo);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete pacienteArquivo' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<PacienteArquivo> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PacienteArquivo', id);
    const toDelete = await this.pacienteArquivoService.findById(id);
    return await this.pacienteArquivoService.delete(toDelete);
  }
}

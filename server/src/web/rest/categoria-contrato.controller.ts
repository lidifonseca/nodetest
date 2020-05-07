import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import CategoriaContrato from '../../domain/categoria-contrato.entity';
import { CategoriaContratoService } from '../../service/categoria-contrato.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/categoria-contratoes')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('categoria-contratoes')
export class CategoriaContratoController {
  logger = new Logger('CategoriaContratoController');

  constructor(private readonly categoriaContratoService: CategoriaContratoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: CategoriaContrato
  })
  async getAll(@Req() req: Request): Promise<CategoriaContrato[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.categoriaContratoService.findAndCount(
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
    type: CategoriaContrato
  })
  async getOne(@Param('id') id: string): Promise<CategoriaContrato> {
    return await this.categoriaContratoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create categoriaContrato' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CategoriaContrato
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() categoriaContrato: CategoriaContrato): Promise<CategoriaContrato> {
    const fs = require('fs');
    const re = /(?:\.([^.]+))?$/;

    const contratoOldName = categoriaContrato.contrato;
    const contratoBase64 = req.body.contratoBase64;
    const contratoFileName = req.body.contratoFileName;
    const contratoBDName =
      'arquivos/categoria-contratoes/' +
      Math.random()
        .toString(36)
        .substr(2) +
      Math.random()
        .toString(36)
        .substr(2) +
      '.' +
      re.exec(contratoFileName)[1];
    categoriaContrato.contrato = '/' + contratoBDName;
    await fs.mkdir('arquivos/categoria-contratoes/', { recursive: true }, err => {
      if (err) console.log(err);
      else {
        require('fs').writeFile(contratoBDName, contratoBase64, 'base64', function(err) {
          console.log(err);
        });
      }
    });

    console.info(categoriaContrato);
    const created = await this.categoriaContratoService.save(categoriaContrato);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'CategoriaContrato', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update categoriaContrato' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: CategoriaContrato
  })
  async put(@Req() req: Request, @Body() categoriaContrato: CategoriaContrato): Promise<CategoriaContrato> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'CategoriaContrato', categoriaContrato.id);

    const fs = require('fs');
    const re = /(?:\.([^.]+))?$/;

    const contratoOldName = categoriaContrato.contrato;
    const contratoBase64 = req.body.contratoBase64;
    const contratoFileName = req.body.contratoFileName;
    const contratoBDName =
      'arquivos/categoria-contratoes/' +
      Math.random()
        .toString(36)
        .substr(2) +
      Math.random()
        .toString(36)
        .substr(2) +
      '.' +
      re.exec(contratoFileName)[1];
    categoriaContrato.contrato = '/' + contratoBDName;
    await fs.mkdir('arquivos/categoria-contratoes/', { recursive: true }, err => {
      if (err) console.log(err);
      else {
        fs.stat(contratoOldName.replace(/^\/+|\/+$/g, ''), function(err, stats) {
          console.log(stats); //here we got all information of file in stats variable
          if (err) return console.log(err);
          fs.unlink(contratoOldName.replace(/^\/+|\/+$/g, ''), function(err) {
            if (err) return console.error(err);
            console.log('file deleted successfully');
          });
        });
        require('fs').writeFile(contratoBDName, contratoBase64, 'base64', function(err) {
          console.log(err);
        });
      }
    });

    return await this.categoriaContratoService.update(categoriaContrato);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete categoriaContrato' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<CategoriaContrato> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'CategoriaContrato', id);
    const toDelete = await this.categoriaContratoService.findById(id);
    return await this.categoriaContratoService.delete(toDelete);
  }
}

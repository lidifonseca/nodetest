import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import OcorrenciaProntuario from '../../domain/ocorrencia-prontuario.entity';
import { OcorrenciaProntuarioService } from '../../service/ocorrencia-prontuario.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/ocorrencia-prontuarios')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('ocorrencia-prontuarios')
export class OcorrenciaProntuarioController {
  logger = new Logger('OcorrenciaProntuarioController');

  constructor(private readonly ocorrenciaProntuarioService: OcorrenciaProntuarioService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: OcorrenciaProntuario
  })
  async getAll(@Req() req: Request): Promise<OcorrenciaProntuario[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.ocorrenciaProntuarioService.findAndCount(
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
    type: OcorrenciaProntuario
  })
  async getOne(@Param('id') id: string): Promise<OcorrenciaProntuario> {
    return await this.ocorrenciaProntuarioService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create ocorrenciaProntuario' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: OcorrenciaProntuario
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() ocorrenciaProntuario: OcorrenciaProntuario): Promise<OcorrenciaProntuario> {
    console.info(ocorrenciaProntuario);
    const created = await this.ocorrenciaProntuarioService.save(ocorrenciaProntuario);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'OcorrenciaProntuario', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update ocorrenciaProntuario' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: OcorrenciaProntuario
  })
  async put(@Req() req: Request, @Body() ocorrenciaProntuario: OcorrenciaProntuario): Promise<OcorrenciaProntuario> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'OcorrenciaProntuario', ocorrenciaProntuario.id);

    return await this.ocorrenciaProntuarioService.update(ocorrenciaProntuario);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete ocorrenciaProntuario' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<OcorrenciaProntuario> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'OcorrenciaProntuario', id);
    const toDelete = await this.ocorrenciaProntuarioService.findById(id);
    return await this.ocorrenciaProntuarioService.delete(toDelete);
  }
}

import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import PacienteDiagnosticoTemp from '../../domain/paciente-diagnostico-temp.entity';
import { PacienteDiagnosticoTempService } from '../../service/paciente-diagnostico-temp.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/paciente-diagnostico-temps')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('paciente-diagnostico-temps')
export class PacienteDiagnosticoTempController {
  logger = new Logger('PacienteDiagnosticoTempController');

  constructor(private readonly pacienteDiagnosticoTempService: PacienteDiagnosticoTempService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PacienteDiagnosticoTemp
  })
  async getAll(@Req() req: Request): Promise<PacienteDiagnosticoTemp[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.pacienteDiagnosticoTempService.findAndCount(
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
    type: PacienteDiagnosticoTemp
  })
  async getOne(@Param('id') id: string): Promise<PacienteDiagnosticoTemp> {
    return await this.pacienteDiagnosticoTempService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create pacienteDiagnosticoTemp' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PacienteDiagnosticoTemp
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() pacienteDiagnosticoTemp: PacienteDiagnosticoTemp): Promise<PacienteDiagnosticoTemp> {
    const created = await this.pacienteDiagnosticoTempService.save(pacienteDiagnosticoTemp);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacienteDiagnosticoTemp', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update pacienteDiagnosticoTemp' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PacienteDiagnosticoTemp
  })
  async put(@Req() req: Request, @Body() pacienteDiagnosticoTemp: PacienteDiagnosticoTemp): Promise<PacienteDiagnosticoTemp> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacienteDiagnosticoTemp', pacienteDiagnosticoTemp.id);
    return await this.pacienteDiagnosticoTempService.update(pacienteDiagnosticoTemp);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete pacienteDiagnosticoTemp' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<PacienteDiagnosticoTemp> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PacienteDiagnosticoTemp', id);
    const toDelete = await this.pacienteDiagnosticoTempService.findById(id);
    return await this.pacienteDiagnosticoTempService.delete(toDelete);
  }
}

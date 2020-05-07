import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import PacienteEnqueteApp from '../../domain/paciente-enquete-app.entity';
import { PacienteEnqueteAppService } from '../../service/paciente-enquete-app.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/paciente-enquete-apps')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('paciente-enquete-apps')
export class PacienteEnqueteAppController {
  logger = new Logger('PacienteEnqueteAppController');

  constructor(private readonly pacienteEnqueteAppService: PacienteEnqueteAppService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PacienteEnqueteApp
  })
  async getAll(@Req() req: Request): Promise<PacienteEnqueteApp[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.pacienteEnqueteAppService.findAndCount(
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
    type: PacienteEnqueteApp
  })
  async getOne(@Param('id') id: string): Promise<PacienteEnqueteApp> {
    return await this.pacienteEnqueteAppService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create pacienteEnqueteApp' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PacienteEnqueteApp
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() pacienteEnqueteApp: PacienteEnqueteApp): Promise<PacienteEnqueteApp> {
    console.info(pacienteEnqueteApp);
    const created = await this.pacienteEnqueteAppService.save(pacienteEnqueteApp);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacienteEnqueteApp', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update pacienteEnqueteApp' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PacienteEnqueteApp
  })
  async put(@Req() req: Request, @Body() pacienteEnqueteApp: PacienteEnqueteApp): Promise<PacienteEnqueteApp> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacienteEnqueteApp', pacienteEnqueteApp.id);

    return await this.pacienteEnqueteAppService.update(pacienteEnqueteApp);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete pacienteEnqueteApp' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<PacienteEnqueteApp> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PacienteEnqueteApp', id);
    const toDelete = await this.pacienteEnqueteAppService.findById(id);
    return await this.pacienteEnqueteAppService.delete(toDelete);
  }
}

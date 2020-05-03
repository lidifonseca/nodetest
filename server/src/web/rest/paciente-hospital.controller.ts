import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import PacienteHospital from '../../domain/paciente-hospital.entity';
import { PacienteHospitalService } from '../../service/paciente-hospital.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/paciente-hospitals')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('paciente-hospitals')
export class PacienteHospitalController {
  logger = new Logger('PacienteHospitalController');

  constructor(private readonly pacienteHospitalService: PacienteHospitalService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PacienteHospital
  })
  async getAll(@Req() req: Request): Promise<PacienteHospital[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.pacienteHospitalService.findAndCount(
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
    type: PacienteHospital
  })
  async getOne(@Param('id') id: string): Promise<PacienteHospital> {
    return await this.pacienteHospitalService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create pacienteHospital' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PacienteHospital
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() pacienteHospital: PacienteHospital): Promise<PacienteHospital> {
    const created = await this.pacienteHospitalService.save(pacienteHospital);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacienteHospital', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update pacienteHospital' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PacienteHospital
  })
  async put(@Req() req: Request, @Body() pacienteHospital: PacienteHospital): Promise<PacienteHospital> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PacienteHospital', pacienteHospital.id);
    return await this.pacienteHospitalService.update(pacienteHospital);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete pacienteHospital' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<PacienteHospital> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PacienteHospital', id);
    const toDelete = await this.pacienteHospitalService.findById(id);
    return await this.pacienteHospitalService.delete(toDelete);
  }
}

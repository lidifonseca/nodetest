import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import StatusAtualProf from '../../domain/status-atual-prof.entity';
import { StatusAtualProfService } from '../../service/status-atual-prof.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/status-atual-profs')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('status-atual-profs')
export class StatusAtualProfController {
  logger = new Logger('StatusAtualProfController');

  constructor(private readonly statusAtualProfService: StatusAtualProfService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: StatusAtualProf
  })
  async getAll(@Req() req: Request): Promise<StatusAtualProf[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.statusAtualProfService.findAndCount(
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
    type: StatusAtualProf
  })
  async getOne(@Param('id') id: string): Promise<StatusAtualProf> {
    return await this.statusAtualProfService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create statusAtualProf' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: StatusAtualProf
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() statusAtualProf: StatusAtualProf): Promise<StatusAtualProf> {
    const created = await this.statusAtualProfService.save(statusAtualProf);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'StatusAtualProf', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update statusAtualProf' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: StatusAtualProf
  })
  async put(@Req() req: Request, @Body() statusAtualProf: StatusAtualProf): Promise<StatusAtualProf> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'StatusAtualProf', statusAtualProf.id);
    return await this.statusAtualProfService.update(statusAtualProf);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete statusAtualProf' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<StatusAtualProf> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'StatusAtualProf', id);
    const toDelete = await this.statusAtualProfService.findById(id);
    return await this.statusAtualProfService.delete(toDelete);
  }
}

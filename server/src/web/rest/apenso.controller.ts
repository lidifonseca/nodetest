import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Apenso from '../../domain/apenso.entity';
import { ApensoService } from '../../service/apenso.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/apensos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('apensos')
export class ApensoController {
  logger = new Logger('ApensoController');

  constructor(private readonly apensoService: ApensoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Apenso
  })
  async getAll(@Req() req: Request): Promise<Apenso[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.apensoService.findAndCount(
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
    type: Apenso
  })
  async getOne(@Param('id') id: string): Promise<Apenso> {
    return await this.apensoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create apenso' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Apenso
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() apenso: Apenso): Promise<Apenso> {
    const created = await this.apensoService.save(apenso);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Apenso', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update apenso' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Apenso
  })
  async put(@Req() req: Request, @Body() apenso: Apenso): Promise<Apenso> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Apenso', apenso.id);
    return await this.apensoService.update(apenso);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete apenso' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Apenso> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Apenso', id);
    const toDelete = await this.apensoService.findById(id);
    return await this.apensoService.delete(toDelete);
  }
}

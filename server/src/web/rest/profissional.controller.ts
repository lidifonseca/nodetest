import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import Profissional from '../../domain/profissional.entity';
import { ProfissionalService } from '../../service/profissional.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/profissionals')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('profissionals')
export class ProfissionalController {
  logger = new Logger('ProfissionalController');

  constructor(private readonly profissionalService: ProfissionalService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: Profissional
  })
  async getAll(@Req() req: Request): Promise<Profissional[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.profissionalService.findAndCount(
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
    type: Profissional
  })
  async getOne(@Param('id') id: string): Promise<Profissional> {
    return await this.profissionalService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create profissional' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Profissional
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() profissional: Profissional): Promise<Profissional> {
    console.info(profissional);
    const created = await this.profissionalService.save(profissional);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Profissional', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update profissional' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: Profissional
  })
  async put(@Req() req: Request, @Body() profissional: Profissional): Promise<Profissional> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Profissional', profissional.id);

    return await this.profissionalService.update(profissional);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete profissional' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<Profissional> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Profissional', id);
    const toDelete = await this.profissionalService.findById(id);
    return await this.profissionalService.delete(toDelete);
  }
}

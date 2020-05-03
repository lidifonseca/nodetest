import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import GrauParentesco from '../../domain/grau-parentesco.entity';
import { GrauParentescoService } from '../../service/grau-parentesco.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/grau-parentescos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('grau-parentescos')
export class GrauParentescoController {
  logger = new Logger('GrauParentescoController');

  constructor(private readonly grauParentescoService: GrauParentescoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: GrauParentesco
  })
  async getAll(@Req() req: Request): Promise<GrauParentesco[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.grauParentescoService.findAndCount(
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
    type: GrauParentesco
  })
  async getOne(@Param('id') id: string): Promise<GrauParentesco> {
    return await this.grauParentescoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create grauParentesco' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: GrauParentesco
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() grauParentesco: GrauParentesco): Promise<GrauParentesco> {
    const created = await this.grauParentescoService.save(grauParentesco);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'GrauParentesco', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update grauParentesco' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: GrauParentesco
  })
  async put(@Req() req: Request, @Body() grauParentesco: GrauParentesco): Promise<GrauParentesco> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'GrauParentesco', grauParentesco.id);
    return await this.grauParentescoService.update(grauParentesco);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete grauParentesco' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<GrauParentesco> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'GrauParentesco', id);
    const toDelete = await this.grauParentescoService.findById(id);
    return await this.grauParentescoService.delete(toDelete);
  }
}

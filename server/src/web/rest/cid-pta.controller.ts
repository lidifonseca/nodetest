import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import CidPta from '../../domain/cid-pta.entity';
import { CidPtaService } from '../../service/cid-pta.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/cid-ptas')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('cid-ptas')
export class CidPtaController {
  logger = new Logger('CidPtaController');

  constructor(private readonly cidPtaService: CidPtaService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: CidPta
  })
  async getAll(@Req() req: Request): Promise<CidPta[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.cidPtaService.findAndCount(
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
    type: CidPta
  })
  async getOne(@Param('id') id: string): Promise<CidPta> {
    return await this.cidPtaService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create cidPta' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CidPta
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() cidPta: CidPta): Promise<CidPta> {
    console.info(cidPta);
    const created = await this.cidPtaService.save(cidPta);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'CidPta', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update cidPta' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: CidPta
  })
  async put(@Req() req: Request, @Body() cidPta: CidPta): Promise<CidPta> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'CidPta', cidPta.id);

    return await this.cidPtaService.update(cidPta);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete cidPta' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<CidPta> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'CidPta', id);
    const toDelete = await this.cidPtaService.findById(id);
    return await this.cidPtaService.delete(toDelete);
  }
}

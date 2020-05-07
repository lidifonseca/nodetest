import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import DescPta from '../../domain/desc-pta.entity';
import { DescPtaService } from '../../service/desc-pta.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/desc-ptas')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('desc-ptas')
export class DescPtaController {
  logger = new Logger('DescPtaController');

  constructor(private readonly descPtaService: DescPtaService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: DescPta
  })
  async getAll(@Req() req: Request): Promise<DescPta[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.descPtaService.findAndCount(
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
    type: DescPta
  })
  async getOne(@Param('id') id: string): Promise<DescPta> {
    return await this.descPtaService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create descPta' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: DescPta
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() descPta: DescPta): Promise<DescPta> {
    console.info(descPta);
    const created = await this.descPtaService.save(descPta);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'DescPta', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update descPta' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: DescPta
  })
  async put(@Req() req: Request, @Body() descPta: DescPta): Promise<DescPta> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'DescPta', descPta.id);

    return await this.descPtaService.update(descPta);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete descPta' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<DescPta> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'DescPta', id);
    const toDelete = await this.descPtaService.findById(id);
    return await this.descPtaService.delete(toDelete);
  }
}

import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import PadPta from '../../domain/pad-pta.entity';
import { PadPtaService } from '../../service/pad-pta.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/pad-ptas')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('pad-ptas')
export class PadPtaController {
  logger = new Logger('PadPtaController');

  constructor(private readonly padPtaService: PadPtaService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PadPta
  })
  async getAll(@Req() req: Request): Promise<PadPta[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.padPtaService.findAndCount(
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
    type: PadPta
  })
  async getOne(@Param('id') id: string): Promise<PadPta> {
    return await this.padPtaService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create padPta' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PadPta
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() padPta: PadPta): Promise<PadPta> {
    const created = await this.padPtaService.save(padPta);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PadPta', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update padPta' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PadPta
  })
  async put(@Req() req: Request, @Body() padPta: PadPta): Promise<PadPta> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PadPta', padPta.id);
    return await this.padPtaService.update(padPta);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete padPta' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<PadPta> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PadPta', id);
    const toDelete = await this.padPtaService.findById(id);
    return await this.padPtaService.delete(toDelete);
  }
}

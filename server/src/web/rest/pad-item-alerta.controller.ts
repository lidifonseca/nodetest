import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import PadItemAlerta from '../../domain/pad-item-alerta.entity';
import { PadItemAlertaService } from '../../service/pad-item-alerta.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/pad-item-alertas')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('pad-item-alertas')
export class PadItemAlertaController {
  logger = new Logger('PadItemAlertaController');

  constructor(private readonly padItemAlertaService: PadItemAlertaService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PadItemAlerta
  })
  async getAll(@Req() req: Request): Promise<PadItemAlerta[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.padItemAlertaService.findAndCount(
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
    type: PadItemAlerta
  })
  async getOne(@Param('id') id: string): Promise<PadItemAlerta> {
    return await this.padItemAlertaService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create padItemAlerta' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PadItemAlerta
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() padItemAlerta: PadItemAlerta): Promise<PadItemAlerta> {
    console.info(padItemAlerta);
    const created = await this.padItemAlertaService.save(padItemAlerta);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PadItemAlerta', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update padItemAlerta' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PadItemAlerta
  })
  async put(@Req() req: Request, @Body() padItemAlerta: PadItemAlerta): Promise<PadItemAlerta> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PadItemAlerta', padItemAlerta.id);

    return await this.padItemAlertaService.update(padItemAlerta);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete padItemAlerta' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<PadItemAlerta> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PadItemAlerta', id);
    const toDelete = await this.padItemAlertaService.findById(id);
    return await this.padItemAlertaService.delete(toDelete);
  }
}

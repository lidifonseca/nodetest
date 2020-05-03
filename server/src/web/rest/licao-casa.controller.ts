import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import LicaoCasa from '../../domain/licao-casa.entity';
import { LicaoCasaService } from '../../service/licao-casa.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/licao-casas')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('licao-casas')
export class LicaoCasaController {
  logger = new Logger('LicaoCasaController');

  constructor(private readonly licaoCasaService: LicaoCasaService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: LicaoCasa
  })
  async getAll(@Req() req: Request): Promise<LicaoCasa[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.licaoCasaService.findAndCount(
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
    type: LicaoCasa
  })
  async getOne(@Param('id') id: string): Promise<LicaoCasa> {
    return await this.licaoCasaService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create licaoCasa' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: LicaoCasa
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() licaoCasa: LicaoCasa): Promise<LicaoCasa> {
    const created = await this.licaoCasaService.save(licaoCasa);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'LicaoCasa', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update licaoCasa' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: LicaoCasa
  })
  async put(@Req() req: Request, @Body() licaoCasa: LicaoCasa): Promise<LicaoCasa> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'LicaoCasa', licaoCasa.id);
    return await this.licaoCasaService.update(licaoCasa);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete licaoCasa' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<LicaoCasa> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'LicaoCasa', id);
    const toDelete = await this.licaoCasaService.findById(id);
    return await this.licaoCasaService.delete(toDelete);
  }
}

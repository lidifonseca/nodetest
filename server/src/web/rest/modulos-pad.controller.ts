import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import ModulosPad from '../../domain/modulos-pad.entity';
import { ModulosPadService } from '../../service/modulos-pad.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/modulos-pads')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('modulos-pads')
export class ModulosPadController {
  logger = new Logger('ModulosPadController');

  constructor(private readonly modulosPadService: ModulosPadService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ModulosPad
  })
  async getAll(@Req() req: Request): Promise<ModulosPad[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.modulosPadService.findAndCount(
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
    type: ModulosPad
  })
  async getOne(@Param('id') id: string): Promise<ModulosPad> {
    return await this.modulosPadService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create modulosPad' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ModulosPad
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() modulosPad: ModulosPad): Promise<ModulosPad> {
    console.info(modulosPad);
    const created = await this.modulosPadService.save(modulosPad);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ModulosPad', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update modulosPad' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ModulosPad
  })
  async put(@Req() req: Request, @Body() modulosPad: ModulosPad): Promise<ModulosPad> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ModulosPad', modulosPad.id);

    return await this.modulosPadService.update(modulosPad);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete modulosPad' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<ModulosPad> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ModulosPad', id);
    const toDelete = await this.modulosPadService.findById(id);
    return await this.modulosPadService.delete(toDelete);
  }
}

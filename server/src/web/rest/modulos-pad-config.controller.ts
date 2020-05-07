import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import ModulosPadConfig from '../../domain/modulos-pad-config.entity';
import { ModulosPadConfigService } from '../../service/modulos-pad-config.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/modulos-pad-configs')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('modulos-pad-configs')
export class ModulosPadConfigController {
  logger = new Logger('ModulosPadConfigController');

  constructor(private readonly modulosPadConfigService: ModulosPadConfigService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ModulosPadConfig
  })
  async getAll(@Req() req: Request): Promise<ModulosPadConfig[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.modulosPadConfigService.findAndCount(
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
    type: ModulosPadConfig
  })
  async getOne(@Param('id') id: string): Promise<ModulosPadConfig> {
    return await this.modulosPadConfigService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create modulosPadConfig' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ModulosPadConfig
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() modulosPadConfig: ModulosPadConfig): Promise<ModulosPadConfig> {
    console.info(modulosPadConfig);
    const created = await this.modulosPadConfigService.save(modulosPadConfig);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ModulosPadConfig', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update modulosPadConfig' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ModulosPadConfig
  })
  async put(@Req() req: Request, @Body() modulosPadConfig: ModulosPadConfig): Promise<ModulosPadConfig> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'ModulosPadConfig', modulosPadConfig.id);

    return await this.modulosPadConfigService.update(modulosPadConfig);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete modulosPadConfig' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<ModulosPadConfig> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'ModulosPadConfig', id);
    const toDelete = await this.modulosPadConfigService.findById(id);
    return await this.modulosPadConfigService.delete(toDelete);
  }
}

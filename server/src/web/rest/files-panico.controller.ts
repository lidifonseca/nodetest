import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import FilesPanico from '../../domain/files-panico.entity';
import { FilesPanicoService } from '../../service/files-panico.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/files-panicos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('files-panicos')
export class FilesPanicoController {
  logger = new Logger('FilesPanicoController');

  constructor(private readonly filesPanicoService: FilesPanicoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: FilesPanico
  })
  async getAll(@Req() req: Request): Promise<FilesPanico[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    let filters = [];
    for (var param in req.query) {
      if (param !== 'page' && param !== 'size' && param !== 'sort' && param !== 'cacheBuster') {
        let column = param.split('.')[0];
        let operation = param.split('.').length > 1 ? param.split('.')[1] : 'equals';
        filters.push({ column, value: req.query[param], operation });
      }
    }
    const [results, count] = await this.filesPanicoService.findAndCount(
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
    type: FilesPanico
  })
  async getOne(@Param('id') id: string): Promise<FilesPanico> {
    return await this.filesPanicoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create filesPanico' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: FilesPanico
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() filesPanico: FilesPanico): Promise<FilesPanico> {
    console.info(filesPanico);
    const created = await this.filesPanicoService.save(filesPanico);
    console.info(created);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'FilesPanico', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update filesPanico' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: FilesPanico
  })
  async put(@Req() req: Request, @Body() filesPanico: FilesPanico): Promise<FilesPanico> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'FilesPanico', filesPanico.id);

    return await this.filesPanicoService.update(filesPanico);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete filesPanico' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<FilesPanico> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'FilesPanico', id);
    const toDelete = await this.filesPanicoService.findById(id);
    return await this.filesPanicoService.delete(toDelete);
  }
}

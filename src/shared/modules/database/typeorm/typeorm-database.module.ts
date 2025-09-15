import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

@Module({})
export class TypeormDatabaseModule {
  static forRoot(options: TypeOrmModuleAsyncOptions): DynamicModule {
    return {
      module: TypeormDatabaseModule,
      imports: [TypeOrmModule.forRootAsync(options)],
    };
  }
}

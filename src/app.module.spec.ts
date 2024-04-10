import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CatsModule } from './cats/cats.module';

describe('AppModule', () => {
  let appModule: TestingModule;

  beforeEach(async () => {
    appModule = await Test.createTestingModule({
      imports: [
        AppModule,
        ConfigModule.forRoot(), // Mock ConfigModule
        TypeOrmModule.forRoot({
          // Mock TypeOrmModule
          type: 'sqlite', // Use an in-memory SQLite database for testing
          database: ':memory:',
          entities: [],
          synchronize: true,
        }),
        CoreModule,
        AuthModule,
        UsersModule,
        CatsModule,
      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(appModule).toBeDefined();
  });

  it('should import ConfigModule', async () => {
    expect(appModule.get(ConfigModule)).toBeDefined();
  });

  it('should import TypeOrmModule', async () => {
    expect(appModule.get(TypeOrmModule)).toBeDefined();
  });

  it('should import CoreModule', async () => {
    expect(appModule.get(CoreModule)).toBeDefined();
  });

  it('should import AuthModule', async () => {
    expect(appModule.get(AuthModule)).toBeDefined();
  });

  it('should import UsersModule', async () => {
    expect(appModule.get(UsersModule)).toBeDefined();
  });

  it('should import CatsModule', async () => {
    expect(appModule.get(CatsModule)).toBeDefined();
  });
});

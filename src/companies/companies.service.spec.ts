import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from './companies.service';

describe('CompaniesService', () => {
  let service: CompaniesService;

  const mockCompaniesService = {
    create: jest.fn((companyData) => ({
      id: Date.now(),
      ...companyData,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompaniesService],
    })
      .overrideProvider(CompaniesService)
      .useValue(mockCompaniesService)
      .compile();

    service = module.get<CompaniesService>(CompaniesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

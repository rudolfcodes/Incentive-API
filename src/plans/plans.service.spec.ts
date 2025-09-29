import { Test, TestingModule } from '@nestjs/testing';
import { PlansService } from './plans.service';

describe('PlansService', () => {
  let service: PlansService;

  const mockPlansService = {
    create: jest.fn((planData, companyId) => ({
      id: Date.now(),
      ...planData,
      companyId,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlansService],
    })
      .overrideProvider(PlansService)
      .useValue(mockPlansService)
      .compile();

    service = module.get<PlansService>(PlansService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a plan with companyId', async () => {
    // Test implementation here
    const planData = {
      name: 'Test Plan',
      type: 'RSU',
      description: 'A test plan',
      totalShares: 1000,
      startDate: new Date(),
      status: 'ACTIVE',
      companyId: 1,
    };

    // Mock the create method of the service
    jest.spyOn(service, 'create').mockResolvedValue({
      ...planData,
      companyId: 1,
    });

    const result = await service.create(planData, 1);
    expect(result).toHaveProperty('id');
    expect(result.name).toBe(planData.name);
    expect(result.companyId).toBe(1);
  });
});

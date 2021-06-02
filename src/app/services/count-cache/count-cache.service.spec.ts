/* eslint-disable max-statements */
/* eslint-disable max-lines */
import { TestBed, waitForAsync } from '@angular/core/testing';

import { CountCacheService } from './count-cache.service';
import { HttpClientModule } from '@angular/common/http';
import { Project } from '../../classes/project/project';
import { MockDataService } from '../mock-data/mock-data.service';
import { take } from 'rxjs/operators';

// eslint-disable-next-line max-lines-per-function
describe('EntitiesService', () => {
  let service: CountCacheService;
  let dataService: MockDataService;
  let debugService: any;

  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }).compileComponents();
    service = TestBed.inject(CountCacheService);
    dataService = TestBed.inject(MockDataService);
    debugService = service as any;

    await dataService.getProjects().pipe(take(1)).subscribe((projects: any) => {
      debugService.portfolioModel.projects = projects;
      debugService.portfolioModel.filtered.Projects = projects;
    });
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check calcFrequencies', () => {
    expect(() => {
      let readAll;
      readAll = debugService.calcFrequencies([{ 'Project name': 'P1', 'Team size': 1 }], 'Project');

      readAll = debugService.calcFrequencies([{ Language: 'English' }], 'Language');

      service.checkToggleCollapsed = () => true;
      readAll = debugService.calcFrequencies([{ Language: 'English' }], 'Language');

      debugService.tagCloudProcessorService.calcFrequencies = () => undefined;
      service.checkToggleCollapsed = () => false;
      readAll = debugService.calcFrequencies([{ Language: 'English' }], 'Language');
    }).not.toThrowError();
  });

  it('should check updateCount', () => {
    expect(() => {
      let readAll;
      readAll = debugService.updateCount(undefined, 10);
      const propertyName = 'Project';
      readAll = debugService.updateCount(propertyName, 10);
      debugService.countCache[propertyName] = undefined;
      readAll = debugService.updateCount(propertyName, 10);
      debugService.entities[propertyName] = { Certifications: { node: 'Certifications', parent: 'Accomplishments', class: 'hsl3' } };
      readAll = debugService.updateCount(propertyName, 10);
    }).not.toThrowError();
  });

  it('should check getProjectIsOnePersonTeam', () => {
    expect(() => {
      let readAll;
      const project = new Project();
      const teamSize = 'Team size';
      readAll = service.getProjectIsOnePersonTeam(project);
      project[teamSize] = 1;
      readAll = service.getProjectIsOnePersonTeam(project);
      project[teamSize] = 5;
      readAll = service.getProjectIsOnePersonTeam(project);
    }).not.toThrowError();
  });

  it('should check public interface properties', () => {
    expect(() => {
      service.countCache = service.countCache;
      service.frequenciesCache = service.frequenciesCache;

      service.decryptedPeriod = service.decryptedPeriod;

      service.filtered.Accomplishments = service.filtered.Accomplishments;
      service.filtered.Projects = service.filtered.Projects;
      service.filtered.Publications = service.filtered.Publications;

      let readAll;
      readAll = service.entities;

      readAll = service.filtered;
      readAll = service.filtered.Certifications;
      readAll = service.filtered.Languages;
      readAll = service.filtered.Courses;
      readAll = service.filtered.Organizations;
      readAll = service.filtered.Volunteering;
      readAll = service.filtered.Vacation;
    }).not.toThrowError();
  });

  it('should check public interface methods', () => {
    expect(() => {
      let readAll;
      readAll = service.getDecryptedProjectPeriod(new Project());

      readAll = service.calcCountCache([]);
      readAll = service.calcCountCache(['Project']);
      readAll = service.calcCountCache(['Language']);
      readAll = service.calcCountCache(['Accomplishment']);
      readAll = service.calcCountCache(['Publication']);

      debugService.portfolioModel.filtered.Projects = debugService.portfolioModel.projects;
      readAll = debugService.calcCountCacheProjects();

      readAll = service.checkToggleCollapsed();
      const cacheKey = 'Certification';
      readAll = service.checkToggleCollapsed(cacheKey);
    }).not.toThrowError();
  });
});

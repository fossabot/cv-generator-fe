import { Component, OnInit, Input, Injector, ReflectiveInjector } from '@angular/core';
import { Params } from '../../classes/params';

import { PortfolioComponent } from '../portfolio/portfolio.component';

import { CertificationComponent } from '../certification/certification.component';
import { EducationComponent } from '../education/education.component';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss']
})
export class CvComponent implements OnInit {
  private readonly frequenciesDivider;

  public get cv() { return this.portfolioComponent.cv; }
  public get entities() { return this.portfolioComponent.entities; }

  public get countCache() { return this.portfolioComponent.countCache; }

  public get filteredAccomplishments() { return this.portfolioComponent.filteredAccomplishments; }
  public get filteredPublications() { return this.portfolioComponent.filteredPublications; }

  CertificationComponent = CertificationComponent;
  EducationComponent = EducationComponent;

  getInjector(propertyName): Injector {
    const _myInjector = ReflectiveInjector.resolveAndCreate([Params], this.injector);
    const params: any = _myInjector.get(Params);
    params.propertyName = propertyName;
    return _myInjector;
  }

  constructor(
    public portfolioComponent: PortfolioComponent, public injector: Injector) {
    this.frequenciesDivider = portfolioComponent.frequenciesDivider;
  }

  ngOnInit() {
  }

  get searchToken(): string {
    return this.portfolioComponent.searchToken;
  }
  @Input() set searchToken(value: string) {
    this.portfolioComponent.searchToken = value;
  }

  count(collection: any, propertyName: string, splitter: string = ', '): number {
    return this.portfolioComponent.count(collection, propertyName, splitter);
  }

  tabName(key: string): string {
    return this.portfolioComponent.tabName(key);
  }
}

import { Component, Input } from '@angular/core';
import { PortfolioComponent } from '../portfolio/portfolio.component';

/**
 * Navigation component
 */
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  /** Main component name delegate. */
  public get componentName() { return this.portfolioComponent.componentName; }

  /** Instance identification position: '' (top) or ' bottom' (bottom). */
  @Input() position: any;

  /** Entities delegate. */
  public get entities() { return this.portfolioComponent.entities; }

  /** Link-to-this symbol delegate. */
  public get linkToThisSymbol() { return this.portfolioComponent.linkToThisSymbol; }
  /** Link-to-this text delegate. */
  public get linkToThisText() { return this.portfolioComponent.linkToThisText; }

  /**
   * Constructs the Navigation component.
   * @param portfolioComponent The common portfolio component injected dependency.
   */
  constructor(
    public portfolioComponent: PortfolioComponent) {
  }

  /** Tab name delegate. */
  public tabName(key: string): string {
    return this.portfolioComponent.tabName(key);
  }

  /**
   * Decorates a main section.
   * @param key The entity key.
   *
   * @returns The processed section name.
   */
  public decorateMain(key: string) {
    return this.entities[key] && this.entities[key].main === 'true'
      ? this.entities[key].section
        ? this.entities[key].section.toUpperCase()
        : ''
      : this.entities[key].section
        ? this.entities[key].section
        : '';
  }

  /**
   * Makes spaces in a section name non-breaking.
   * @param sectionName The name of the section to process.
   *
   * @returns The processed section name.
   */
  public nonBreaking(sectionName: string) {
    return sectionName ? this.replaceAll(sectionName, ' ', String.fromCharCode(160)) : ''; // &nbsp;
  }

  /** Replace all delegate. */
  private replaceAll(str: string | undefined, search: string | RegExp, replacement: any): string {
    return this.portfolioComponent.replaceAll(str, search, replacement);
  }

  /** TrackBy iterator help function. */
  trackByFn(index: any, item: any) {
    return index;
  }
}

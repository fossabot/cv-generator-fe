// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { Component } from '@angular/core';

import { PortfolioService } from '../../services/portfolio/portfolio.service';
import { InputService } from '../../services/input/input.service';
import { UiService } from '../../services/ui/ui.service';
import { PersistenceService } from '../../services/persistence/persistence.service';

/**
 * FooterProvider component.
 */
@Component({
  selector: 'app-footer-provider',
  templateUrl: './footer-provider.component.html',
  styleUrls: ['./footer-provider.component.scss']
})
export class FooterProviderComponent {
  /** UI delegate. */
  public get ui() { return this.portfolioService.model.portfolioModel.ui; }

  /** Entities delegate. */
  public get entities() { return this.portfolioService.model.portfolioModel.entities; }

  /** Decorations delegate. */
  public get decorations() { return this.portfolioService.toolbarService.decorations; }

  /** The component key */
  public get key() { return 'Footer'; }

  /** The expand component key */
  public get expandKey() { return ['Expand', this.key].join(' '); }

  /**
   * Constructs the FooterProvider component.
   *
   * @param portfolioService The portfolio service injected dependency.
   * @param inputService The input service injected dependency.
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   */
  constructor(
    public readonly portfolioService: PortfolioService,
    public readonly inputService: InputService,
    public readonly uiService: UiService,
    public readonly persistenceService: PersistenceService,
  ) { }

  /** UI safe text delegate. */
  public uiText(key: string): string { return this.uiService.uiText(key); }

  /** Get an asset image delegate. */
  getAssetUri(imageName: string): string {
    return this.uiService.imageService.getAssetUri(imageName);
  }

  /** Label delegate. */
  label(key: string): string {
    return this.uiService.label(key);
  }

  /** Link label delegate. */
  linkLabel(key: string | undefined): string {
    return this.uiService.linkLabel(key);
  }

  /** Tab name delegate. */
  tabName(key: string): string {
    return this.uiService.tabName(key);
  }

  /** Save toggle delegate. */
  saveToggle(event: MouseEvent) {
    this.persistenceService.saveToggle(event);
  }

  /** Simulate keyboard clicks delegate. */
  keypress(event: KeyboardEvent) {
    this.inputService.keypress(event);
  }

  /** TrackBy iterator help function. */
  public trackByFn(index: any, item: any) {
    return index;
  }
}

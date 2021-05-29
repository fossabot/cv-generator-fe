import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { take } from 'rxjs/operators';

import { ContextConfiguration } from './interfaces/context/context-configuration';

import { ThemeChangerService } from './services/theme-changer/theme-changer.service';
import { UiService } from './services/ui/ui.service';
import { PersistenceService } from './services/persistence/persistence.service';

import { environment } from '../environments/environment';

/** Print callback type to capture print-related events. */
type PrintCallback = () => void;

/**
 * The main application component.
 * ~implements {@link OnInit}
 * ~implements {@link AfterViewInit}
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  /** The application title */
  title = 'cv-generator-fe';

  /** Main element. */
  @ViewChild('main') main!: ElementRef<HTMLDivElement>;

  /** The app theme getter delegate */
  public get theme(): string { return this.themeChangerService.theme; }
  /** The app theme setter delegate */
  @Input() public set theme(value: string) { this.themeChangerService.theme = value; }

  /** The app theme background getter delegate */
  public get themeBackground(): string { return this.themeChangerService.themeBackground; }
  /** The app theme background setter delegate */
  @Input() public set themeBackground(value: string) { this.themeChangerService.themeBackground = value; }

  /** The default app theme */
  private get defaultTheme() { return ThemeChangerService.defaultTheme; }

  /** Preparations before printing. */
  private savedTheme = this.defaultTheme;

  /** The animation root element. */
  @ViewChild('animationRoot') animationRoot!: ElementRef<HTMLDivElement>;

  /** Tinted getter. */
  public get tinted() {
    return this.persistenceService.getItem('tinted') === 'true';
  }

  /** Microprinted getter. */
  public get microprinted() {
    return this.persistenceService.getItem('microprinted') === 'true';
  }

  /** Context getter. */
  public get context() {
    return this.persistenceService.getItem('context') === 'true';
  }

  /**
   * Constructs the app.
   *
   * @param swUpdate The injected software updater.
   *
   * @param themeChangerService The theme changer service dependency.
   * @param uiService The ui service injected dependency.
   * @param persistenceService The persistence service injected dependency.
   */
  constructor(
    private readonly uiService: UiService,

    private readonly themeChangerService: ThemeChangerService,
    private readonly swUpdate: SwUpdate,
    private readonly persistenceService: PersistenceService,
  ) { }

  /** OnInit handler. */
  ngOnInit(): void {
    this.tryCheckForUpdates();
  }

  /** AfterViewInit handler. */
  ngAfterViewInit(): void {
    this.Initialize();
    this.subscribeUiInvalidated();
  }

  /** Cleanup */
  ngOnDestroy() {
    this.unsubscribeUiInvalidated();
  }

  /** Subscribe events */
  private subscribeUiInvalidated() {
    this.uiService.uiInvalidated$.subscribe((uiInvalidated$) => {
      if (uiInvalidated$) {
        this.refreshUI();
      }
    });
  }

  /** Unsubscribe events */
  private unsubscribeUiInvalidated() {
    if (this.uiService.uiInvalidated$) {
      this.uiService.uiInvalidated$.unsubscribe();
    }
  }

  /** Refresh UI */
  private refreshUI() {
    this.theme = this.theme;
  }

  /** Try check for updates. */
  private tryCheckForUpdates(): void {
    if (this.swUpdate.isEnabled) { this.checkForUpdates(); }
  }

  /** Check for updates. */
  private checkForUpdates(): void {
    this.swUpdate.available.pipe(take(1)).subscribe(() => { this.onCheckForUpdates(); });
  }

  /** Check for updates handler. */
  private onCheckForUpdates(): void {
    if (confirm('New version available. Load New Version?')) {
      this.windowReload();
    }
  }

  /** Initialization. */
  private Initialize(): void {
    this.detectMedia(this.beforePrintHandler, this.afterPrintHandler);

    // set last used theme or else the high contrast theme in case testing at CI servers
    this.theme = environment.CV_GENERATOR_AUDITING ? 'contrast_100' : this.theme;

    // transition out
    this.animationRoot.nativeElement.addEventListener('beforeunload', this.onBeforeUnload);
  }

  /** Before unload event handler. */
  private onBeforeUnload(): void {
    document.body.classList.add('animate-out');
  }

  /**
   * Preparations before printing.
   */
  private beforePrintHandler = (): void => {
    const oldTtheme = this.theme;
    const newTtheme = 'print';

    // take better care when recording the old theme in case multiple changes have happened
    if (oldTtheme !== newTtheme) {
      this.savedTheme = oldTtheme;
    }
    this.theme = newTtheme;
    // tslint:disable-next-line: semicolon
  };

  /**
   * Preparations after printing.
   */
  private afterPrintHandler = (): void => {
    this.theme = this.savedTheme;
    // tslint:disable-next-line: semicolon
  };

  /**
   * Checks for media if print and not normal screen one.
   *
   * @param beforePrintHandler Callback used when before printing.
   * @param afterPrintHandler Callback used when after printing.
   */
  private detectMedia(beforePrintHandler: PrintCallback, afterPrintHandler: PrintCallback): void {
    if (globalThis.matchMedia) {
      const mediaQueryList = globalThis.matchMedia('print');
      mediaQueryList.addEventListener('change', (mql) => this.onDetectMedia(beforePrintHandler, afterPrintHandler, mql.matches));
    }

    globalThis.onbeforeprint = beforePrintHandler;
    globalThis.onafterprint = afterPrintHandler;
  }

  /**
   * Checks for media if print and not normal screen one.
   *
   * @param beforePrintHandler Callback used when before printing.
   * @param afterPrintHandler Callback used when after printing.
   * @param mqlMatches Whether media query list event.
   */
  private onDetectMedia(beforePrintHandler: PrintCallback, afterPrintHandler: PrintCallback, mqlMatches: boolean) {
    if (mqlMatches) {
      beforePrintHandler();
    } else {
      afterPrintHandler();
    }
  }

  /**
   * Nav state changed event handler.
   *
   * @param navStateConfiguration The new state configuration.
   */
  public onNavStateChanged(navStateConfiguration: ContextConfiguration): void {
    this.main.nativeElement.style.marginLeft = this.context ? navStateConfiguration.width : '0px';
    this.main.nativeElement.style.backgroundColor = this.tinted ? navStateConfiguration.backgroundColor : 'rgba(0,0,0,0)';
  }

  /** Reload window delegate. */
  private windowReload() { this.uiService.windowReload(); }
}

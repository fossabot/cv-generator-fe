import { BrowserModule, Title } from '@angular/platform-browser';
import { ApplicationRef, DoBootstrap, NgModule } from '@angular/core';

// Routing Module
import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';

// App Root
import { AppComponent } from './app.component';

// Feature Modules
import { ContextSwitcherModule } from './modules/context-switcher/context-switcher.module';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { WebpageModule } from './modules/webpage/webpage.module';

// Services Providers
import { ConfigService } from './services/config/config.service';
import { DataService } from './services/data/data.service';
import { ImageDataService } from './services/image-data/image-data.service';
import { ChartService } from './services/chart/chart.service';
import { ChartColorService } from './services/chart-color/chart-color.service';
import { GanttChartService } from './services/gantt-chart/gantt-chart.service';
import { GeneralTimelineService } from './services/general-timeline/general-timeline.service';
import { MapService } from './services/map/map.service';
import { TagCloudProcessorService } from './services/tag-cloud-processor/tag-cloud-processor.service';
import { ThemeChangerService } from './services/theme-changer/theme-changer.service';
import { ExcelDateFormatterService } from './services/excel-date-formatter/excel-date-formatter.service';
import { SearchEngineService } from './services/search-engine/search-engine.service';
import { SearchHistoryService } from './services/search-history/search-history.service';
import { SearchTokenizerService } from './services/search-tokenizer/search-tokenizer.service';
import { DocumentService } from './services/document/document.service';
import { EntitiesService } from './services/entities/entities.service';
import { CountCacheService } from './services/count-cache/count-cache.service';
import { TruncatorServiceFactory } from './factories/truncator/truncator.service.factory';
import { SorterServiceFactory } from './factories/sorter/sorter.service.factory';
import { ContextService } from './services/context/context.service';

import { LogUpdateService } from './services/log-update/log-update.service';
import { PromptUpdateService } from './services/prompt-update/prompt-update.service';
import { CheckForUpdateService } from './services/check-for-update/check-for-update.service';

import { IsSecureGuardService } from './services/is-secure-guard/is-secure-guard.service';

import { InputService } from './services/input/input.service';
import { ImageService } from './services/image/image.service';
import { LocalizationService } from './services/localization/localization.service';
import { UiService } from './services/ui/ui.service';
import { ToolbarService } from './services/toolbar/toolbar.service';

import { AccomplishmentsService } from './services/accomplishments/accomplishments.service';

import { DataLoaderService } from './services/data-loader/data-loader.service';
import { PersistenceService } from './services/persistence/persistence.service';

import { EngineService } from './services/engine/engine.service';
import { SearchService } from './services/search/search.service';
import { FilterService } from './services/filter/filter.service';
import { FilterGeneralTimelineService } from './services/filter-general-timeline/filter-general-timeline.service';
import { ModelModel } from './model/model/model.model';

import { ComponentOutletInjectorService } from './services/component-outlet-injector/component-outlet-injector.service';
import { Params } from './services/component-outlet-injector/params';

import { Logger } from './classes/logger/logger';
import { ConsoleLoggerService } from './services/console-logger/console-logger.service';

import { StylesheetsComponent } from './components/stylesheets/stylesheets.component';

// Connect Plotly
import { CommonModule } from '@angular/common';
import { PlotlyViaCDNModule } from 'angular-plotly.js';
// PlotlyViaCDNModule.plotlyVersion = 'latest';
// PlotlyViaCDNModule.plotlyBundle = 'geo';

/** The main application module. */
@NgModule({
  declarations: [
    AppComponent,
    StylesheetsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    FormsModule,
    HttpClientModule,

    PortfolioModule.forRoot(),
    ContextSwitcherModule,
    WebpageModule,

    CommonModule,
    PlotlyViaCDNModule,

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    Title,

    ConfigService,
    DataService,
    ImageDataService,
    ChartService,
    ChartColorService,
    GanttChartService,
    GeneralTimelineService,
    MapService,
    TagCloudProcessorService,
    ThemeChangerService,
    ExcelDateFormatterService,
    SearchEngineService,
    SearchHistoryService,
    SearchTokenizerService,
    DocumentService,
    EntitiesService,
    CountCacheService,
    ...TruncatorServiceFactory.providers,
    ...SorterServiceFactory.providers,
    ContextService,

    ComponentOutletInjectorService,
    Params,

    { provide: Logger, useClass: ConsoleLoggerService },

    LogUpdateService,
    PromptUpdateService,
    CheckForUpdateService,

    IsSecureGuardService,

    InputService,
    ImageService,
    LocalizationService,
    UiService,
    ToolbarService,

    AccomplishmentsService,

    DataLoaderService,
    PersistenceService,

    EngineService,
    SearchService,
    FilterService,
    FilterGeneralTimelineService,
    ModelModel,
  ],
  exports: [FormsModule, HttpClientModule],
})
export class AppModule implements DoBootstrap {
  /**
   * Constructs the app.
   * ~constructor
   *
   * @param configService The config service injected dependency.
   */
  constructor(
    public readonly configService: ConfigService,
  ) {
  }

  /** Bootstrap the app */
  ngDoBootstrap(appRef: ApplicationRef) {
    this.configService.fetchConfig().finally(() => appRef.bootstrap(AppComponent));
  }
}

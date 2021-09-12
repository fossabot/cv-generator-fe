// Copyright The CV generator frontend (cv-generator-fe) contributors.
// SPDX-License-Identifier: MIT
//
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectGanttChartModule } from '../project-gantt-chart/project-gantt-chart.module';
import { ProjectContributionsModule } from '../project-contributions/project-contributions.module';
import { ProjectListModule } from '../project-list/project-list.module';
import { ProjectIndexModule } from '../project-index/project-index.module';
import { ProjectCardModule } from '../project-card/project-card.module';
import { SorterModule } from '../sorter/sorter.module';
import { HeaderModule } from '../header/header.module';
import { HeaderTitleModule } from '../header-title/header-title.module';

import { ProjectComponent } from '../../components/project/project.component';

/** Project module. */
@NgModule({
  declarations: [ProjectComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    ProjectGanttChartModule,
    ProjectContributionsModule,
    ProjectListModule,
    ProjectIndexModule,
    ProjectCardModule,
    SorterModule,
    HeaderModule,
    HeaderTitleModule,
  ],
  exports: [ProjectComponent]
})
export class ProjectModule { }

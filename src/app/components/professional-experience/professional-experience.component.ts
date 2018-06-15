import { Component, OnInit } from '@angular/core';
import { PropertyComponent } from '../property/property.component';

/**
 * Professional experience component
 */
@Component({
  selector: 'app-professional-experience',
  templateUrl: './professional-experience.component.html',
  styleUrls: ['./professional-experience.component.scss']
})
export class ProfessionalExperienceComponent extends PropertyComponent {
  /** Date format */
  private dateFormat = 'yyyy';
}

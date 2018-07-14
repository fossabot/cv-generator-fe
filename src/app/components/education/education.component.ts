import { Component, OnInit } from '@angular/core';
import { PropertyComponent } from '../property/property.component';

/**
 * Education component
 */
@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent extends PropertyComponent {
  /** Date format */
  public get dateFormat() { return 'dd.MM.yyyy'; }

  /**
   * Education subject.
   * @param propertyName The property name.
   */
  schoolSubject(propertyName) {
    return [
      propertyName['Field'],
      this.schoolDetail(propertyName)
    ]
      .filter(_ => _ !== undefined && _ !== null && _ !== '')
      .join(': ');
  }

  /**
   * Education detail.
   * @param propertyName The property name.
   */
  schoolDetail(propertyName) {
    return [
      propertyName['Degree'],
      propertyName['Major']
    ]
      .filter(_ => _ !== undefined && _ !== null && _ !== '')
      .join(' in ');
  }
}

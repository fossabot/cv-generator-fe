import { ElementRef } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';

/**
 * Common testing static class.
 * Used at test time only.
 */
export class TestingCommon {
  /** Mock window reload count. */
  public static mockWindowReloadCount = 0;

  /**
   * Check the common lifecycle hooks.
   * @param calee The object whose hooks are to be tested.
   */
  public static checkLifecycleHooks(calee: any) {
    const lifecycleHoooks = ['ngOnInit', 'ngAfterViewInit'] as const;
    lifecycleHoooks.forEach(hook => {
      if (calee[hook]) { calee[hook](); }
    });
  }

  /**
   * Should simulate mouse click.
   * @param clickables The objects to be tested.
   */
  public static shouldSimulateMouseClick(clickables: (ElementRef | undefined)[] | undefined) {
    clickables?.forEach(_ => _?.nativeElement.click());
  }

  /**
   * Should simulate mouse click using keyboard.
   * @param clickables The objects to be tested.
   */
  public static shouldSimulateMouseClickUsingKeyboard(clickables: (ElementRef | undefined)[] | undefined) {
    clickables?.forEach(_ => _?.nativeElement.dispatchEvent(new KeyboardEvent('keypress', { key: 'Enter' })));
  }

  /**
   * Should check public interface.
   * @param component The object whose hooks are to be tested.
   */
  public static shouldCheckPublicInterface<T extends FooterComponent>(component: T) {
    let readAll;
    readAll = component.ui;
    readAll = component.entities;
    readAll = component.decorations;
    readAll = component.key;
    readAll = component.expandKey;
    readAll = component.label('');
    readAll = component.uiText('');
  }

  /** Mock window reload. */
  public static mockWindowReload() {
    // console.log(`TestingCommon: mockPageReload: Page reloaded.`);
    TestingCommon.mockWindowReloadCount++;
  }
}

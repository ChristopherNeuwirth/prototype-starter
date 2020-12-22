import { isPlatformBrowser } from '@angular/common';
import { ClassProvider, FactoryProvider, InjectionToken, PLATFORM_ID, Injectable, Inject } from '@angular/core';

export const WINDOW = new InjectionToken('WindowToken');

// This is necessary to access WINDOW in factory functions, since factories cannot use @Inject decorator
@Injectable()
export class WindowTokenHolder {
  constructor(@Inject(WINDOW) public window: Window) {}
}

export abstract class WindowRef {
  get nativeWindow(): Window | Object {
    throw new Error('Not implemented.');
  }
}

@Injectable()
export class BrowserWindowRef extends WindowRef {
  constructor() {
    super();
  }

  get nativeWindow(): Window | Object {
    return window;
  }
}

export function windowFactory(windowRef: WindowRef, platformId: Object): Window | Object {
  if (isPlatformBrowser(platformId)) {
    return windowRef.nativeWindow;
  }
  return new Object();
}

const browserWindowProvider: ClassProvider = {
  provide: WindowRef,
  useClass: BrowserWindowRef
};

export const windowProvider: FactoryProvider = {
  provide: WINDOW,
  useFactory: windowFactory,
  deps: [WindowRef, PLATFORM_ID]
};

export const windowProviders = [browserWindowProvider, windowProvider, WindowTokenHolder];

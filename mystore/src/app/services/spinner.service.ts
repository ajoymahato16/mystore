import { Injectable,signal,computed,Signal,WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private _loading: WritableSignal<boolean> = signal(false);
  readonly loading: Signal<boolean> = computed(() => this._loading());

  show(): void {
    this._loading.set(true);
  }
  hide(): void {
    this._loading.set(false);
  }
}

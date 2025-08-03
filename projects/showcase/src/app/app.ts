import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { of } from 'rxjs';
import { distinctUntilChangedWithMemory } from '@grandgular/rx';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  a$ = of(1,2,3).pipe(distinctUntilChangedWithMemory())
  b$ = of(1,2,3).pipe(distinctUntilChangedWithMemory(10))
  c$ = of(1,2,3).pipe(distinctUntilChangedWithMemory({
    memorySize: 5,
    comparator: (prev, curr) => prev.includes(curr)
  }))
}

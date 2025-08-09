import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChangedWithMemory } from '@grandgular/rx';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-distinct-until-changed-with-memory-operator-showcase',
  template: ` <div>
    <h1>distinctUntilChangedWithMemory() RxJS operator Demo</h1>

    <div>
      <h2>Case 1: Infinite Memory (default)</h2>
      <p>Remembers all previous values (no duplicates ever)</p>
      <input
        #input1
        type="text"
        (keyup.enter)="addValue(1, input1.value); input1.value = ''"
        placeholder="Enter value and press Enter"
      />
      <button (click)="addValue(1, input1.value); input1.value = ''">
        Add
      </button>
      <div><strong>Input History:</strong> {{ history1.join(', ') }}</div>
      <div><strong>Output Values:</strong> {{ output1.join(', ') }}</div>
    </div>
    <hr />
    <div>
      <h2>Case 2: Last 10 Values Memory</h2>
      <p>Only remembers the last 10 values</p>
      <input
        #input2
        type="text"
        (keyup.enter)="addValue(2, input2.value); input2.value = ''"
        placeholder="Enter value and press Enter"
      />
      <button (click)="addValue(2, input2.value); input2.value = ''">
        Add
      </button>
      <div><strong>Input History:</strong> {{ history2.join(', ') }}</div>
      <div><strong>Output Values:</strong> {{ output2.join(', ') }}</div>
    </div>
    <hr />
    <div>
      <h2>Case 3: Last 5 Values with Custom Comparator</h2>
      <p>Remembers last 5 values using includes() for comparison</p>
      <input
        #input3
        type="text"
        (keyup.enter)="addValue(3, input3.value); input3.value = ''"
        placeholder="Enter value and press Enter"
      />
      <button (click)="addValue(3, input3.value); input3.value = ''">
        Add
      </button>
      <div><strong>Input History:</strong> {{ history3.join(', ') }}</div>
      <div><strong>Output Values:</strong> {{ output3.join(', ') }}</div>
    </div>
  </div>`,
})
export class DistinctUntilChangedWithMemoryOperatorShowcase {
  // Setup case 1 - infinite memory
  private source1 = new Subject<string>();
  history1: string[] = [];
  output1: string[] = [];

  // Case 2: Last 10 values memory
  private source2 = new Subject<string>();
  history2: string[] = [];
  output2: string[] = [];

  // Case 3: Last 5 values with custom comparator
  private source3 = new Subject<string>();
  history3: string[] = [];
  output3: string[] = [];

  constructor() {
    // Setup case 1 - infinite memory
    this.source1
      .pipe(distinctUntilChangedWithMemory(), takeUntilDestroyed())
      .subscribe((value) => this.output1.push(value));

    // Setup case 2 - last 10 values memory
    this.source2
      .pipe(distinctUntilChangedWithMemory(10), takeUntilDestroyed())
      .subscribe((value) => this.output2.push(value));

    // Setup case 3 - last 5 values with custom comparator
    this.source3
      .pipe(
        distinctUntilChangedWithMemory({
          memorySize: 5,
          comparator: (prev, curr) => prev.includes(curr),
        }),
        takeUntilDestroyed(),
      )
      .subscribe((value) => this.output3.push(value));
  }

  addValue(caseNumber: number, value: string) {
    if (!value.trim()) return;

    switch (caseNumber) {
      case 1:
        this.history1.push(value);
        this.source1.next(value);
        break;
      case 2:
        this.history2.push(value);
        this.source2.next(value);
        break;
      case 3:
        this.history3.push(value);
        this.source3.next(value);
        break;
    }
  }
}

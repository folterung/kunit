# Testing
Decorator driven testing framework for Angular2 projects.

## Installation
**This repository is a work in progress.**<br>
In order to use this testing framework you will need to clone it down locally and copy the files into your existing project.<br>
**Once I have the package structure setup properly and publish a package to npm I will update the installation instructions.**

TODO:
- [ ] Update README.md with usage instructions.
  + [x] Accessing `TestBed` via the test class constructor.
  + [x] Using the `@Instance` decorator to get a component instance.
  + [ ] Using the `@Mock` decorator to automatically generate a mock object which mirrors the real object.
  + [ ] Using the `@Fixture` decorator to get a component fixture (this is currently buggy).
- [ ] Add example usage tests in repo.
- [ ] Compile down code into `js` for easier consumption.
- [ ] Work with Angular team to ensure that it works properly in all scenarios.
- [ ] Make package installable via npm.

## Usage
Example: Accessing the TestBed via the test class constructor.
```JavaScript
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

// Import kunit decorators
import { BeforeEach, Test, TestModule } from 'kunit';

// Component to be tested
@Component({
  selector: 'example-component',
  template: '<h2>{{title}}</h2>'
})
class ExampleComponent {
  public title = 'Example Component';
  
  public setTitle(newTitle: string): string {
    return this.title = newTitle;
  }
}

@TestModule({
  declarations: [ ExampleComponent ]
})
export class ExampleComponentTest {
  exampleComponent: ExampleComponent;
  
  constructor(private testBed: TestBed) {}
  
  @BeforeEach
  doBeforeEach() {
    // We can reduce the need to directly access the `testBed` by using the `Instance` decorator (see below).
    this.exampleComponent = this.testBed.createComponent(ExampleComponent).componentInstance;
  }
  
  @Test
  hasCorrectDefaultTitle() {
    expect(this.exampleComponent.title).toBe('Example Component');
  }
  
  @Test
  setTitleShouldSetTitleMemberCorrectly() {
    this.exampleComponent.setTitle('New Title For Example Component');
    
    expect(this.exampleComponent.title).toBe('New Title For Example Component');
  }
}
```

Example: Testing a component using the `Instance` decorator
```JavaScript
import { Component } from '@angular/core';

// Import kunit decorators
import { Instance, Test, TestModule } from 'kunit';

// Component to be tested
@Component({
  selector: 'example-component',
  template: '<h2>{{title}}</h2>'
})
class ExampleComponent {
  public title = 'Example Component';
  
  public setTitle(newTitle: string): string {
    return this.title = newTitle;
  }
}

@TestModule({
  declarations: [ ExampleComponent ]
})
export class ExampleComponentTest {
  @Instance
  exampleComponent: ExampleComponent;
  
  @Test
  hasCorrectDefaultTitle() {
    expect(this.exampleComponent.title).toBe('Example Component');
  }
  
  @Test
  setTitleShouldSetTitleMemberCorrectly() {
    this.exampleComponent.setTitle('New Title For Example Component');
    
    expect(this.exampleComponent.title).toBe('New Title For Example Component');
  }
}
```

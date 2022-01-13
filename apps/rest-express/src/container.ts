export class Container {
  private registry: Map<string, any>;
  constructor() {
    this.registry = new Map<string, any>();
  }

  register(name: string, cb: (c: Container) => any) {
    Object.defineProperty(this, name, {
      get: () => {
        if (!this.registry.hasOwnProperty(name)) {
          this.registry.set(name, cb(this));
        }

        return this.registry.get(name);
      },
      configurable: true,
      enumerable: true,
    });

    return this;
  }
}

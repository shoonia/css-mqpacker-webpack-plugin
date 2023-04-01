interface Options {
  test?: string | RegExp | (string | RegExp)[]
  include?: string | RegExp | (string | RegExp)[]
  exclude?: string | RegExp | (string | RegExp)[]
  sort?: boolean | ((a: string, b: string) => number)
}

declare class CssMqpackerPlugin {
  constructor(options?: Options)
  apply(compiler: import("webpack").Compiler): void
}

export = CssMqpackerPlugin

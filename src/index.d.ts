interface Options {
  test?: string | RegExp | (string | RegExp)[]
  include?: string | RegExp | (string | RegExp)[]
  exclude?: string | RegExp | (string | RegExp)[]
  sort?: boolean
}

declare class CssMqpackerPlugin {
  constructor(options?: Options)
  apply(compiler: import("webpack").Compiler): void
}

export = CssMqpackerPlugin

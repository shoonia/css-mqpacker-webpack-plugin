interface Options {
  /**
   * Include all modules that pass test assertion
   */
  test?: string | RegExp | (string | RegExp)[]
  /**
   * Include all modules matching any of these conditions
   */
  include?: string | RegExp | (string | RegExp)[]
  /**
   * Exclude all modules matching any of these conditions
   */
  exclude?: string | RegExp | (string | RegExp)[]
  /**
   * Sort media queries
   */
  sort?: boolean | ((a: string, b: string) => number)
}

declare class CssMqpackerPlugin {
  constructor(options?: Options)
  /**
   * Apply the plugin
   */
  apply(compiler: import("webpack").Compiler): void
}

export = CssMqpackerPlugin

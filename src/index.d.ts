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

/**
 * The Webpack plugin for pack same CSS media query rules into one using PostCSS
 */
declare class CssMqpackerPlugin {
  static readonly name: "CssMqpackerPlugin"

  constructor(options?: Options)
  /**
   * Apply the plugin
   */
  apply(compiler: import("webpack").Compiler): void
}

export = CssMqpackerPlugin

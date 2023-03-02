interface Options {
  test?: RegExp
  include?: RegExp
  exclude?: RegExp
  sort?: boolean
}

declare class CssMqpackerPlugin {
  constructor(options?: Options)
}

export default CssMqpackerPlugin

const {NlpManager} = require('node-nlp')

interface ExtractOptions {
  languages: string,
  model: string
}

class Extract {
  options: ExtractOptions
  constructor(options: ExtractOptions){
    this.options = options
  }

  public async process(kata: string){
    const manager = new NlpManager()
    manager.load(this.options.model)
    const process = await manager.process(this.options.languages, kata)
    return process
  }
}


export default Extract

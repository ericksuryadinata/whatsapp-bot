const {NlpManager} = require('node-nlp')

interface TrainingOptions {
  modelFileName: string,
  languages: Array<string>,
  threshold: number,
  autoSave: boolean,
  autoLoad: boolean
}
class Training {
  options: TrainingOptions;

  constructor(options: TrainingOptions){
    this.options = options
    this.options.autoLoad = false
    this.options.autoSave = true
  }

  public async run(){
    const manager = new NlpManager(this.options)

    manager.addNamedEntityText('kondisiWaktu', 'Pagi', ['id'], ['pagi', 'Pagi'])
    manager.addNamedEntityText('kondisiWaktu', 'Siang', ['id'], ['siang', 'Siang'])
    manager.addNamedEntityText('kondisiWaktu', 'Sore', ['id'], ['sore', 'Sore'])
    manager.addNamedEntityText('kondisiWaktu', 'Malam', ['id'], ['malam', 'Malam'])
    manager.addDocument('id', 'Selamat %kondisiWaktu%', 'sapaanKabar')
    manager.addDocument('id', 'Hai', 'sapaanKabarBiasa')
    manager.addDocument('id', 'Hai, Apa Kabar ?', 'sapaanKabarTanya')
    manager.addDocument('id', 'Bagaimana kabarmu ?', 'sapaanKabarTanya')
    manager.addDocument('id', 'Gimana kabarmu ?', 'sapaanKabarTanya')
    manager.addDocument('id', 'Bagaimana kondisimu ?', 'sapaanKabarTanya')
    manager.addAnswer('id', 'sapaanKabar', '{{kondisiWaktu}}')
    manager.addAnswer('id', 'sapaanKabar', 'Selamat {{kondisiWaktu}} juga')
    manager.addAnswer('id', 'sapaanKabar', '{{kondisiWaktu}} juga')
    manager.addAnswer('id', 'sapaanKabarTanya', 'Baik - Baik')
    manager.addAnswer('id', 'sapaanKabarTanya', 'Selalu sehat :)')
    manager.addAnswer('id', 'sapaanKabarTanya', 'Selalu Semangat')
    manager.addAnswer('id', 'sapaanKabarBiasa', 'Hi Juga')
    manager.addAnswer('id', 'sapaanKabarBiasa', 'Hey')
    manager.addAnswer('id', 'sapaanKabarBiasa', 'Halo')
    await manager.train()
  }
}


export default Training

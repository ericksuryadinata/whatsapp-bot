import Extract from "./Extract"
import Training from "./Training"

export async function training(){
  const options = {
    autoSave: false,
    autoLoad: false,
    threshold: 0.9,
    languages: ['id'],
    modelFileName: 'source/model.nlp'
  }
  const training = new Training(options)
  await training.run()

  const message = {
    'status':'success'
  }
  return message
}

export async function extract(kata: string){
  const options = {
    languages:'id',
    model:'source/model.nlp'
  }

  const extract = new Extract(options)

  const result = await extract.process(kata)

  const message = {
    'status':'success',
    'hasil': result
  }
  return message
}

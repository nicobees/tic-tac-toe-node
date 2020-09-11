import { RESTDataSource } from 'apollo-datasource-rest'

export interface ControllerInterface<T> {
  getControllerName(): string
}

export default abstract class Controller<T = Record<string, unknown>> extends RESTDataSource implements ControllerInterface<T> {
  constructor (private name: string) {
    super()
  }

  getControllerName (): string {
    return this.name
  }

  // inputData = (data: T | T[]): T | T[] => {
  //   // TODO - implement logic if this function is actually needed
  //   return data
  // }

  // outputData = (data: T | T[]): T | T[] => {
  //   // TODO - implement logic if this function is actually needed
  //   return data
  // }
}

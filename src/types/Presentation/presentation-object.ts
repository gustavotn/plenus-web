import type { GerenciadorAtributos } from './gerenciador-atributos';

export interface PresentationObject {
  name: string;
  text: string;
  objectTypeName: string;
  gerenciadorAtributos: GerenciadorAtributos;
}

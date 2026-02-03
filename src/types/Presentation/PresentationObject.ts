import type { GerenciadorAtributos } from './GerenciadorAtributos';

export interface PresentationObject {
  name: string;
  text: string;
  objectTypeName: string;
  gerenciadorAtributos: GerenciadorAtributos;
}

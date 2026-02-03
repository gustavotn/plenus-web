import type { GerenciadorAtributos } from './GerenciadorAtributos';
import type { PresentationObject } from './PresentationObject';

export interface Presentation {
  objects: PresentationObject[];
  gerenciadoAttributos: GerenciadorAtributos;
}

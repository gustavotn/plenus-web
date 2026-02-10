import type { GerenciadorAtributos } from './gerenciador-atributos';
import type { PresentationObject } from './presentation-object';

export interface Presentation {
  objects: PresentationObject[];
  gerenciadoAttributos: GerenciadorAtributos;
}

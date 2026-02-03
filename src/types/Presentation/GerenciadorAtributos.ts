import type { AtributoAcaoCustomizada } from './AtributoAcaoCustomizada';
import type { AtributoClasse } from './AtributoClasse';
import type { AtributoPropriedade } from './AtributoPropriedade';

export interface GerenciadorAtributos {
  atributoClasse: AtributoClasse;
  atributoPropriedade: AtributoPropriedade;
  atributosAcaoPersonalizada: AtributoAcaoCustomizada[];
}

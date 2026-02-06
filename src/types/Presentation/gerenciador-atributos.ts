import type { AtributoAcaoCustomizada } from './atributo-acao-customizada';
import type { AtributoClasse } from './atributo-classe';
import type { AtributoPropriedade } from './atributo-propriedade';

export interface GerenciadorAtributos {
  atributoClasse: AtributoClasse;
  atributoPropriedade: AtributoPropriedade;
  atributosAcaoPersonalizada: AtributoAcaoCustomizada[];
}

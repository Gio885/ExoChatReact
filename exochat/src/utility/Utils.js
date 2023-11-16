export function raggruppaPerChiave(lista, chiave) {
    return lista.reduce((raggruppato, elemento) => {
      const valoreChiave = elemento[chiave];
  
      // Se la chiave non esiste ancora nel risultato, creala
      if (!raggruppato[valoreChiave]) {
        raggruppato[valoreChiave] = [];
      }
  
      // Aggiungi l'elemento al gruppo corrispondente
      raggruppato[valoreChiave].push(elemento);
  
      return raggruppato;
    }, {});
  }
"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "relationshipStatus";

/**
 * Estado do pedido. Fica apenas no navegador dela (localStorage) —
 * nada é enviado para servidor nenhum.
 */
export function useRelationship() {
  const [official, setOfficial] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) === "official") setOfficial(true);
    } catch {
      // navegação privada pode bloquear localStorage — segue sem persistir
    }
  }, []);

  const makeOfficial = useCallback(() => {
    setOfficial(true);
    try {
      localStorage.setItem(KEY, "official");
    } catch {
      // sem persistência, mas o estado da sessão continua valendo
    }
  }, []);

  return { official, makeOfficial };
}

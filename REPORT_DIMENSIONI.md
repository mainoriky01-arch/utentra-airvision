# REPORT CONFRONTO TABELLE DIMENSIONALI

**Fonte autoritativa:** https://utentra.it (dati da `specs.json` nel workspace)  
**Sito verificato:** https://utentra.lovable.app  
**Data verifica:** 2026-03-18  
**Metodologia:** Estrazione tabelle via browser JS + confronto automatico con specs.json

---

## ✅ IDENTICHE (12 serie)

Tutti i modelli, con tutti i valori dimensionali, sono identici tra utentra.it e lovable.

| Serie | Modelli | Note |
|-------|---------|------|
| U/APE | 15 | OK |
| U/APR | 13 | OK |
| U/APF | 16 | OK |
| U/ARP | 6 | OK |
| U/TM | 9 | OK |
| U/MPR | 13 | OK |
| U/HC | 13 | OK |
| U/AP | 9 | OK |
| U/EL | 11 | OK |
| U/EP | 8 | OK |
| U/EI | 25 | OK |
| U/EIL | 25 | OK |

---

## ⚠️ QUASI IDENTICHE — Solo differenza di formattazione (3 serie)

Valori tutti corretti. L'unica differenza è il nome della colonna peso: `kg` in specs.json vs `Kg` (maiuscolo) in lovable.

| Serie | Modelli | Differenza |
|-------|---------|------------|
| U/RF | 5 | Header colonna: `kg` → `Kg` |
| U/DS | 4 | Header colonna: `kg` → `Kg` |
| U/HF | 7 | Header colonna: `kg` → `Kg` |

**Impatto:** Nessuno sui valori. Cosmetic fix da fare in lovable.

---

## ❌ ERRORI / DIVERGENZE (4 serie)

### U/HPG — Colonne H1/H2 ridondanti

Lovable ha 2 colonne aggiuntive (`H1` e `H2`) che non esistono in specs.json.  
Per tutti i 16 modelli: **H1 = H2 = H** (valore uguale). Sono colonne duplicate.

| Modello | specs.json H | lovable H | lovable H1 | lovable H2 |
|---------|-------------|-----------|------------|------------|
| U/HPG 501 | 450 | 450 | 450 | 450 |
| U/HPG 562 | 500 | 500 | 500 | 500 |
| U/HPG 631 | 560 | 560 | 560 | 560 |
| *(tutti 16 modelli)* | = | = | =H | =H |

**Diagnosi:** Le colonne H1 e H2 in lovable sembrano ridondanti (copie di H). Verificare se nel catalogo originale utentra.it esistono davvero H1/H2 distinti o se sono un errore di struttura tabella.

---

### U/HPH — Colonne H1/H2 ridondanti (con anomalia su 902)

Come per U/HPG, lovable ha H1 e H2 aggiuntivi. Per 4 su 5 modelli H1=H2=H.

**Eccezione: U/HPH 902**

| Campo | specs.json | lovable |
|-------|-----------|---------|
| H | 710 | 710 |
| H1 | N/A | 600 |
| H2 | N/A | 800 |

Per HPH 902, H1≠H2≠H. Potrebbe essere una dimensione legittima (cassa asimmetrica) o un errore. Da verificare sul catalogo originale.

---

### U/AR — Dati corrotti e colonna ød2 errata

**Problemi riscontrati:**

#### 1. Due modelli con dati corrotti su lovable

I modelli `U/AR 254` e `U/AR 304` su lovable contengono numeri sequenziali (es. 280, 281, 282...) invece di valori dimensionali reali. **Questi modelli non esistono in specs.json.**

```
U/AR 254 (lovable): "280","280","280","280","280","280","448","360","361","362"...
U/AR 304 (lovable): "315","315","315","315","315","315","497","395","396","397"...
```

**→ Da eliminare o correggere urgentemente su lovable.**

#### 2. Colonna ød2 con valori errati

Lovable ha una colonna `ød2` non presente in specs.json. I valori di `ød2` sono identici ai valori `kg` per tutti i modelli, il che è fisicamente impossibile (un diametro in mm non può coincidere con il peso in kg per tutti i modelli).

| Modello | ød2 (lovable) | kg (entrambi) |
|---------|--------------|---------------|
| U/AR 201 | 21 | 21 |
| U/AR 202 | 27 | 27 |
| U/AR 204 | 18 | 18 |
| U/AR 253 | 22 | 22 |
| *(tutti 9 modelli)* | =kg | = |

**→ La colonna ød2 in lovable è errata (valori kg duplicati). Da correggere.**

#### 3. Riepilogo U/AR

| Modelli su specs.json | Modelli su lovable | Comuni con dati corretti |
|----------------------|--------------------|--------------------------|
| 9 | 11 | 9 (corretti) + 2 (corrotti) |

I 9 modelli comuni (201, 202, 204, 253, 303, 353, 403, 453, 505) hanno **valori corretti** (ignorando la colonna ød2 errata).

---

### U/CB — specs.json incompleto

specs.json ha solo **6 modelli** mentre lovable ne ha **17**. I 6 modelli presenti in specs.json sono identici tra i due siti.

| Modelli in specs.json | Modelli in lovable | Modelli comuni |
|----------------------|-------------------|----------------|
| 6 | 17 | 6 (tutti identici ✅) |

**Modelli presenti SOLO su lovable (11):**  
U/CB 355, U/CB 403, U/CB 404, U/CB 453, U/CB 454, U/CB 455, U/CB 503, U/CB 504, U/CB 505, U/CB 506, U/CB 507

**→ specs.json è incompleto per U/CB.** I dati aggiuntivi su lovable non sono verificabili rispetto a utentra.it (fonte mancante). Da integrare specs.json con tutti i modelli da utentra.it.

---

## 📥 PRESENTI SOLO SU LOVABLE (specs.json senza dati dimensioni)

Le seguenti serie hanno tabelle dimensionali complete su lovable ma non hanno dati dimensionali in `specs.json`. I valori su lovable **non sono verificabili** rispetto a utentra.it.

| Serie | Modelli su lovable | Note |
|-------|-------------------|------|
| U/PB | 21 | Non in specs.json dimensioni |
| U/ET | 12 | Non in specs.json dimensioni |
| U/CT | 12 | Non in specs.json dimensioni |

**→ Necessario estrarre dati dimensionali da utentra.it per queste serie.**

---

## 🚫 ASSENTE DA ENTRAMBI I SITI

| Serie | Status |
|-------|--------|
| U/PBM | Nessuna tabella dimensionale né su lovable né in specs.json |

---

## 📊 SOMMARIO FINALE

| Stato | Serie | Note |
|-------|-------|------|
| ✅ Identiche | 12 | U/APE, U/APR, U/APF, U/ARP, U/TM, U/MPR, U/HC, U/AP, U/EL, U/EP, U/EI, U/EIL |
| ⚠️ Cosmetic (kg vs Kg) | 3 | U/RF, U/DS, U/HF — valori identici |
| ⚠️ Colonne extra (H1/H2) | 2 | U/HPG, U/HPH — valori base identici |
| ❌ Errori dati lovable | 2 | U/AR (dati corrotti + ød2 errata), U/CB (parziale) |
| 📥 Solo lovable | 3 | U/PB, U/ET, U/CT |
| 🚫 Assente ovunque | 1 | U/PBM |
| **Totale verificate** | **23** | |

---

## 🔧 AZIONI CORRETTIVE PRIORITARIE

### Alta priorità
1. **U/AR 254 e U/AR 304**: Eliminare o correggere i modelli con dati corrotti su lovable
2. **U/AR — ød2**: Eliminare la colonna `ød2` su lovable (contiene valori kg errati) oppure inserire i valori corretti
3. **U/HPH 902 — H1/H2**: Verificare sul catalogo originale i valori H1=600 e H2=800

### Media priorità
4. **U/RF, U/DS, U/HF**: Correggere header colonna da `Kg` a `kg` per coerenza
5. **U/HPG e U/HPH**: Verificare se le colonne H1/H2 sono necessarie o ridondanti. Se ridondanti, rimuovere.
6. **U/CB**: Integrare specs.json con tutti i 17 modelli da utentra.it, verificare i 11 modelli aggiuntivi su lovable

### Bassa priorità  
7. **U/PB, U/ET, U/CT**: Estrarre tabelle dimensionali da utentra.it e verificare con lovable
8. **U/PBM**: Verificare se esiste una tabella dimensionale su utentra.it

---

*Report generato automaticamente tramite estrazione browser + confronto con specs.json*  
*Tool: OpenClaw subagent — session: dimensions-compare*

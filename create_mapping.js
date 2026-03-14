#!/usr/bin/env node
/**
 * Crea il mapping dati Utentra da LiveCurve copia
 * Serie: U/AR→BP, U/CB→BPR, U/PB→EU, U/PBM→EU, U/TM→TPA
 */

const fs = require('fs');
const path = require('path');

// Percorsi
const LIVECURVE_DIR = '/Users/riccardomaino/.openclaw/workspace/utentra-livecurve';
const OUTPUT_DIR = '/Users/riccardomaino/.openclaw/workspace/utentra-airvision/src';

// Carica dati LiveCurve
const curves = JSON.parse(fs.readFileSync(path.join(LIVECURVE_DIR, 'curves.json')));
const powerEff = JSON.parse(fs.readFileSync(path.join(LIVECURVE_DIR, 'curves_power_efficiency.json')));

// Mapping serie Utentra → Euroventilatori
const SERIES_MAP = {
  'U/AR': 'BP',
  'U/CB': 'BPR', 
  'U/PB': 'EU',
  'U/PBM': 'EU',
  'U/TM': 'TPA'
};

// Mapping modelli (da CSV)
// Formato: { 'codice_utentra': 'codice_euro' }
const MODEL_MAP = {
  'U/AR': {
    '201': '201/A', '202': '201/B', '204': '201/C',
    '254': '251/C', '303': '311/A', '304': '311/B',
    '353': '351/A', '354': '351/B', '403': '401/B',
    '404': '401/C', '453': '451/B', '454': '451/C',
    '256': '311/C', '306': '311/C', '356': '351/C'
  },
  'U/CB': {
    '352': '352/A', '353': '351/B', '402': '402/A',
    '403': '401/B', '452': '452/A', '453': '451/B',
    '502': '502/A', '503': '501/B', '354': '352/C',
    '355': '351/D', '404': '401/C', '454': '452/C',
    '455': '451/D', '504': '502/C', '505': '501/D',
    '564': '562/C', '565': '561/B'
  },
  'U/PB': {
    '252': '251', '282': '281', '312': '312', '313': '311',
    '352': '352', '353': '351', '402': '402', '403': '401',
    '452': '452', '453': '451', '503': '501', '562': '562',
    '563': '561', '634': '631', '714': '712', '804': '802'
  },
  'U/PBM': {
    '252': '251', '282': '281', '313': '311', '353': '351',
    '403': '401', '453': '451', '503': '501', '562': '562',
    '563': '561', '714': '712', '804': '802', '805': '801',
    '904': '902', '905': '901'
  },
  'U/TM': {
    '252': '251', '282': '282*', '283': '281', '312': '312*',
    '313': '311', '352': '352', '353': '351', '402': '402',
    '403': '401', '452': '452*', '453': '451'
  }
};

// Risultato
const utentraCurves = {};
const utentraPowerEff = {};

// Per ogni serie Utentra
for (const [utentraSeries, euroSeries] of Object.entries(SERIES_MAP)) {
  console.log(`\nProcessing ${utentraSeries} → ${euroSeries}`);
  
  const euroCurves = curves[euroSeries] || {};
  const euroPower = powerEff[euroSeries] || {};
  const modelMap = MODEL_MAP[utentraSeries] || {};
  
  utentraCurves[utentraSeries] = {};
  utentraPowerEff[utentraSeries] = {};
  
  let found = 0, missing = 0;
  
  for (const [utentraModel, euroModel] of Object.entries(modelMap)) {
    // Cerca il modello Euro (con prefisso serie)
    const euroKey = `${euroSeries} ${euroModel}`;
    const euroData = euroCurves[euroKey];
    const euroPowerData = euroPower[euroKey];
    
    if (euroData) {
      utentraCurves[utentraSeries][utentraModel] = euroData;
      found++;
    } else {
      console.log(`  ✗ ${utentraModel} → ${euroKey} NOT FOUND in curves`);
      missing++;
    }
    
    if (euroPowerData) {
      utentraPowerEff[utentraSeries][utentraModel] = euroPowerData;
    }
  }
  
  console.log(`  ✓ Found: ${found}, Missing: ${missing}`);
}

// Salva
fs.writeFileSync(
  path.join(OUTPUT_DIR, 'curves.json'),
  JSON.stringify(utentraCurves, null, 2)
);
console.log(`\nSaved: ${OUTPUT_DIR}/curves.json`);

fs.writeFileSync(
  path.join(OUTPUT_DIR, 'power_efficiency.json'),
  JSON.stringify(utentraPowerEff, null, 2)
);
console.log(`Saved: ${OUTPUT_DIR}/power_efficiency.json`);

// Statistiche
let totalModels = 0;
for (const series of Object.values(utentraCurves)) {
  totalModels += Object.keys(series).length;
}
console.log(`\nTotal Utentra models: ${totalModels}`);

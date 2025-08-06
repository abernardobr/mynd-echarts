import type { LocaleMessages } from './types'

export const de: LocaleMessages = {
  configDialog: {
    title: 'Diagrammkonfiguration',
    sections: {
      title: 'Titel',
      legend: 'Legende',
      tooltip: 'Tooltip',
      toolbox: 'Werkzeugkasten',
      grid: 'Raster & Layout',
      xAxis: 'X-Achse',
      yAxis: 'Y-Achse',
      colors: 'Farben',
      animation: 'Animation',
      language: 'Sprache / Language / 语言'
    },
    fields: {
      titleText: 'Titeltext',
      subtitle: 'Untertitel',
      position: 'Position',
      textStyleColor: 'Textstilfarbe',
      fontSize: 'Schriftgröße',
      showLegend: 'Legende anzeigen',
      orientation: 'Ausrichtung',
      showTooltip: 'Tooltip anzeigen',
      trigger: 'Auslöser',
      formatter: 'Formatierung',
      showToolbox: 'Werkzeugkasten anzeigen',
      iconSize: 'Symbolgröße',
      itemGap: 'Elementabstand',
      showTitleOnHover: 'Titel beim Überfahren anzeigen',
      features: 'Funktionen',
      enable: 'Aktivieren',
      imageType: 'Bildtyp',
      filename: 'Dateiname',
      readOnly: 'Schreibgeschützt',
      leftMargin: 'Linker Rand',
      rightMargin: 'Rechter Rand',
      topMargin: 'Oberer Rand',
      bottomMargin: 'Unterer Rand',
      containLabel: 'Beschriftung enthalten',
      name: 'Name',
      type: 'Typ',
      showAxisLine: 'Achsenlinie anzeigen',
      showSplitLine: 'Trennlinie anzeigen',
      colorPalette: 'Farbpalette',
      backgroundColor: 'Hintergrundfarbe',
      enableAnimation: 'Animation aktivieren',
      animationDuration: 'Animationsdauer (ms)',
      animationEasing: 'Animations-Easing',
      selectLanguage: 'Sprache auswählen'
    },
    positions: {
      left: 'Links',
      center: 'Mitte',
      right: 'Rechts',
      top: 'Oben',
      middle: 'Mitte',
      bottom: 'Unten'
    },
    orientations: {
      horizontal: 'Horizontal',
      vertical: 'Vertikal'
    },
    triggerTypes: {
      item: 'Element',
      axis: 'Achse',
      none: 'Keine'
    },
    axisTypes: {
      value: 'Wert',
      category: 'Kategorie',
      time: 'Zeit',
      log: 'Logarithmisch'
    },
    chartTypes: {
      line: 'Liniendiagramm',
      bar: 'Balkendiagramm',
      stack: 'Stapel',
      tiled: 'Gekachelt'
    },
    easingTypes: {
      linear: 'Linear',
      cubicIn: 'Kubisch Ein',
      cubicOut: 'Kubisch Aus',
      cubicInOut: 'Kubisch Ein-Aus',
      elasticOut: 'Elastisch Aus',
      bounceOut: 'Sprung Aus'
    },
    features: {
      saveAsImage: 'Als Bild speichern',
      restore: 'Wiederherstellen',
      dataView: 'Datenansicht',
      dataZoom: 'Datenzoom',
      magicType: 'Magischer Typ (Diagrammwechsler)'
    },
    placeholders: {
      chartTitle: 'Diagrammtitel',
      chartSubtitle: 'Diagrammuntertitel',
      formatterExample: '{b}: {c}',
      defaultFilename: 'diagramm',
      marginExample: '10%',
      pixelValue: '60',
      xAxisName: 'X-Achsenname',
      yAxisName: 'Y-Achsenname'
    },
    helpTexts: {
      formatter: 'Platzhalter verwenden: {a} Serienname, {b} Datenname, {c} Datenwert, {d} Prozentsatz. Beispiel: \'{b}: {c} ({d}%)\'',
      languageChange: 'Ändert die Sprache für alle UI-Elemente in der Diagrammkonfiguration'
    },
    buttons: {
      close: 'Schließen',
      reset: 'Zurücksetzen',
      apply: 'Anwenden',
      addColor: 'Farbe hinzufügen'
    }
  }
}
/**
 * @fileoverview Re-export all ECharts types for convenient access
 * @module mynd-echarts/types/echarts
 */

// Core ECharts types
export type {
  ECharts,
  EChartsType,
  EChartsOption,
  SetOptionOpts,
  ResizeOpts,
  EChartsInitOpts,
  ElementEvent,
  ECElementEvent,
  ZRElementEvent,
  ECActionEvent,
  Payload,
  CallbackDataParams,
  DefaultLabelFormatterCallbackParams,
  TooltipFormatterCallback,
  TopLevelFormatterParams,
  LegendFormatterCallback,
  AnimationDelayCallback,
  AnimationDurationCallback,
  RegisteredSeriesOption,
  SeriesOption,
  ComponentOption,
  ComposeOption
} from 'echarts'

// Chart type options
export type {
  LineSeriesOption,
  BarSeriesOption,
  PieSeriesOption,
  ScatterSeriesOption,
  EffectScatterSeriesOption,
  RadarSeriesOption,
  TreeSeriesOption,
  TreemapSeriesOption,
  SunburstSeriesOption,
  BoxplotSeriesOption,
  CandlestickSeriesOption,
  HeatmapSeriesOption,
  MapSeriesOption,
  ParallelSeriesOption,
  LinesSeriesOption,
  GraphSeriesOption,
  SankeySeriesOption,
  FunnelSeriesOption,
  GaugeSeriesOption,
  PictorialBarSeriesOption,
  ThemeRiverSeriesOption,
  CustomSeriesOption
} from 'echarts/charts'

// Component options
export type {
  TitleComponentOption,
  LegendComponentOption,
  GridComponentOption,
  XAXisComponentOption as XAxisComponentOption,
  YAXisComponentOption as YAxisComponentOption,
  PolarComponentOption,
  RadiusAxisComponentOption,
  AngleAxisComponentOption,
  RadarComponentOption,
  DataZoomComponentOption,
  DataZoomInsideComponentOption,
  DataZoomSliderComponentOption,
  VisualMapComponentOption,
  VisualMapContinuousComponentOption,
  VisualMapPiecewiseComponentOption,
  TooltipComponentOption,
  AxisPointerComponentOption,
  ToolboxComponentOption,
  BrushComponentOption,
  GeoComponentOption,
  ParallelAxisComponentOption,
  ParallelComponentOption,
  TimelineComponentOption,
  GraphicComponentOption,
  CalendarComponentOption,
  SingleAxisComponentOption,
  MarkPointComponentOption,
  MarkLineComponentOption,
  MarkAreaComponentOption,
  AriaComponentOption,
  DatasetComponentOption
} from 'echarts/components'

// Coordinate system types
export type {
  GridOption,
  CartesianAxisOption,
  ValueAxisBaseOption,
  CategoryAxisBaseOption,
  TimeAxisBaseOption,
  LogAxisBaseOption
} from 'echarts/types/dist/shared'

// Utility types from ECharts
export type {
  OptionDataValue,
  OptionDataItem,
  OptionDataItemObject,
  OptionSourceData,
  OptionSourceDataOriginal,
  OptionSourceDataObjectRows,
  OptionSourceDataArrayRows,
  OptionSourceDataKeyedColumns,
  OptionSourceDataTypedArray,
  OptionDataValueNumeric,
  OptionDataValueDate,
  OptionId,
  OptionName,
  CallbackFunction,
  AnimationEasing,
  ZRColor,
  ColorString,
  GradientObject,
  PatternObject,
  ImagePatternObject,
  SVGPatternObject,
  LinearGradientObject,
  RadialGradientObject,
  RoamOptionMixin,
  SymbolOptionMixin,
  ItemStyleOption,
  LineStyleOption,
  AreaStyleOption,
  TextCommonOption,
  LabelOption,
  SeriesLabelOption,
  LineLabelOption,
  DefaultStateOption,
  DefaultEmphasisFocus,
  StatesMixinBase,
  StatesOptionMixin,
  MediaQuery,
  MediaUnit,
  PaletteOptionMixin,
  BoxLayoutOptionMixin,
  CircleLayoutOptionMixin,
  ShadowOptionMixin,
  BorderOptionMixin
} from 'echarts/types/dist/util/types'

// Event parameter types
export type {
  EventParams,
  MouseEventParams,
  GlobalOutParams,
  DataZoomEventParams,
  HighlightEventParams,
  SelectEventParams,
  BrushEventParams,
  BrushEndEventParams,
  BrushSelectEventParams,
  RenderedEventParams,
  FinishedEventParams,
  LegendSelectChangedEventParams,
  LegendSelectedEventParams,
  LegendUnselectedEventParams,
  LegendSelectAllEventParams,
  LegendInverseSelectEventParams,
  LegendScrollEventParams,
  TimelineChangeEventParams,
  TimelinePlayChangeEventParams,
  ToolboxSelectChangedEventParams
} from 'echarts/types/src/util/types'
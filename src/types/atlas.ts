export type MacroRegionId =
  | 'central'
  | 'north'
  | 'east'
  | 'south'
  | 'insular_african';

export type UnitType =
  | '자치주(Comunidad Autónoma)'
  | '포랄 자치주(Comunidad Foral)'
  | '자치시(Ciudad Autónoma)';

export type Lens =
  | 'none'
  | 'kingdoms'
  | 'corridors'
  | 'languages'
  | 'geography'
  | 'korea';

export type KingdomLineage =
  | '카스티야 연합왕국'
  | '아라곤 연합왕국'
  | '레온·아스투리아스 계보'
  | '나바라 왕국'
  | '알안달루스·그라나다';

export interface CityItem {
  id: string;
  nameKo: string;
  nameEn: string;
  role: 'capital_largest' | 'capital' | 'major';
  populationMan: number;
  populationText: string;
  coord: [number, number]; // [lng, lat]
  note: string;
  landmarks?: string[];
}

export interface HistoricalEvent {
  era: string;
  title: string;
  detail: string;
}

export interface FamousPerson {
  name: string;
  nameEn: string;
  era: string;
  role: string;
  connectionType: string;
  description: string;
}

export interface KoreanHistoryLink {
  category: '외교·수교' | '원양어업·교민' | '문화·스포츠' | '산업·경제' | '역사·교류';
  title: string;
  year: string;
  description: string;
}

export interface AdminUnitInfo {
  id: string;
  code: string;
  nameKo: string;
  shortNameKo: string;
  nameEn: string;
  nameLocal: string;
  regionId: MacroRegionId;
  type: UnitType;
  nicknameKo: string;
  slogan: string;
  capitalKo: string;
  capitalEn: string;
  capitalPopText: string;
  largestCityKo: string;
  largestCityEn: string;
  largestCityPopText: string;
  isCapitalLargest: boolean;
  highlightStory: string;
  coord: [number, number];
  populationMan: number;
  populationText: string;
  areaKm2: number;
  gdpPerCapitaUsd: number;
  specialMetricLabel: string; // e.g., '소속 주(Provincia)' / '유네스코 유산'
  specialMetricValue: number;
  provincesCount: number;
  statuteYear: number;
  kingdomLineage: KingdomLineage;
  coOfficialLanguages: string[];
  climateZone: string;
  corridors: string[];
  cities: CityItem[];
  historicalRoleSummary: string;
  historicalEvents: HistoricalEvent[];
  famousPeople: FamousPerson[];
  characteristicsSummary: string;
  keyIndustries: string[];
  landmarks: string[];
  nationalParksAndHeritage: string[];
  specialtyAndCulture: string[];
  koreanHistory: KoreanHistoryLink[];
}

export interface MacroRegionMeta {
  id: MacroRegionId;
  nameKo: string;
  nameEn: string;
  shortDesc: string;
  color: string;
  hoverColor: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
}

export interface LensMeta {
  id: Lens;
  label: string;
  shortLabel: string;
  desc: string;
  legendItems: { label: string; color: string }[];
}

export interface CorridorMeta {
  id: string;
  nameKo: string;
  nameEn: string;
  color: string;
  summary: string;
  unitIds: string[];
  pathCoords: [number, number][];
}

export interface HierarchyLevel {
  level: number;
  nameKo: string;
  nameLocal: string;
  countText: string;
  summary: string;
  examples: string;
}

export interface SpainKingdomRow {
  kingdomKo: string;
  kingdomLocal: string;
  era: string;
  coreIdentity: string;
  modernUnits: string[];
  coOfficialLangs: string;
  signatureLegacy: string;
}

export interface SpainSpecialRegimeRow {
  regimeName: string;
  targetUnits: string;
  fiscalOrAdminFeature: string;
  historicalBasis: string;
}

export interface SpainTriviaItem {
  title: string;
  tag: string;
  summary: string;
}

export interface ComparePreset {
  id: string;
  label: string;
  desc: string;
  unitIds: [string, string] | [string, string, string];
}

export interface ProvinceItem {
  ineCode: string; // '01' .. '50'
  unitId: string;
  nameKo: string;
  nameLocal: string;
  capitalKo: string;
  populationMan: number;
  areaKm2: number;
  note: string;
}


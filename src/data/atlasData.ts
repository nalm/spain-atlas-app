import { AdminUnitInfo } from '../types/atlas';
import { UNITS_PART_1 } from './unitsPart1';
import { UNITS_PART_2 } from './unitsPart2';
import { UNITS_PART_3 } from './unitsPart3';

export const ADMIN_UNITS: AdminUnitInfo[] = [
  ...UNITS_PART_1,
  ...UNITS_PART_2,
  ...UNITS_PART_3,
];

export const UNIT_MAP: Record<string, AdminUnitInfo> = Object.fromEntries(
  ADMIN_UNITS.map((u) => [u.id, u])
);

function buildRankMap(
  items: AdminUnitInfo[],
  selector: (u: AdminUnitInfo) => number
): Record<string, number> {
  const sorted = [...items].sort((a, b) => selector(b) - selector(a));
  const map: Record<string, number> = {};
  sorted.forEach((u, idx) => {
    map[u.id] = idx + 1;
  });
  return map;
}

export const POPULATION_RANK = buildRankMap(ADMIN_UNITS, (u) => u.populationMan);
export const AREA_RANK = buildRankMap(ADMIN_UNITS, (u) => u.areaKm2);
export const GDP_RANK = buildRankMap(ADMIN_UNITS, (u) => u.gdpPerCapitaUsd);

export const SPAIN_TOTAL_POPULATION_MAN = ADMIN_UNITS.reduce(
  (acc, u) => acc + u.populationMan,
  0
);
export const SPAIN_TOTAL_AREA_KM2 = ADMIN_UNITS.reduce(
  (acc, u) => acc + u.areaKm2,
  0
);

export function formatAreaKm2(area: number): string {
  return `${area.toLocaleString('ko-KR')} ㎢`;
}

export function formatUsd(usd: number): string {
  return `$${usd.toLocaleString('ko-KR')}`;
}

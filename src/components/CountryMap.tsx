import React, { useMemo, useRef, useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Maximize2,
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { ADMIN_UNITS } from '../data/atlasData';
import { CORRIDORS, LENS_OPTIONS, MACRO_REGIONS } from '../data/countryConfig';
import {
  CANARIAS_INSET_BOX,
  projectCoord,
  REGION_CENTROIDS,
  REGION_PATHS,
} from '../data/spainMapPaths';
import { AdminUnitInfo, Lens, MacroRegionId } from '../types/atlas';

interface CountryMapProps {
  selectedUnitId: string | null;
  selectedCityId: string | null;
  activeRegionFilter: MacroRegionId | 'all';
  activeLens: Lens;
  onSelectUnit: (unitId: string, cityId?: string) => void;
}

function getUnitFill(unit: AdminUnitInfo, lens: Lens, isSelected: boolean): string {
  if (isSelected) return '#1e293b';
  switch (lens) {
    case 'kingdoms': {
      switch (unit.kingdomLineage) {
        case '카스티야 연합왕국':
          return '#fcd34d';
        case '아라곤 연합왕국':
          return '#60a5fa';
        case '레온·아스투리아스 계보':
          return '#34d399';
        case '나바라 왕국':
          return '#a78bfa';
        case '알안달루스·그라나다':
          return '#fb7185';
      }
      break;
    }
    case 'corridors': {
      if (unit.corridors.includes('mad_bcn')) return '#fca5a5';
      if (unit.corridors.includes('mediterranean')) return '#93c5fd';
      if (unit.corridors.includes('mad_south')) return '#fcd34d';
      if (unit.corridors.includes('atlantic_north')) return '#6ee7b7';
      return '#e2e8f0';
    }
    case 'languages': {
      return unit.coOfficialLanguages.length > 1 ? '#818cf8' : '#e2e8f0';
    }
    case 'geography': {
      if (unit.climateZone.includes('대서양')) return '#34d399';
      if (unit.climateZone.includes('대륙성')) return '#fbbf24';
      if (unit.climateZone.includes('아열대')) return '#c084fc';
      return '#38bdf8';
    }
    case 'korea': {
      const keyIds = ['mad', 'cat', 'can', 'val', 'and', 'gal'];
      return keyIds.includes(unit.id) ? '#f472b6' : '#fce7f3';
    }
    default:
      return MACRO_REGIONS[unit.regionId].color;
  }
  return MACRO_REGIONS[unit.regionId].color;
}

export const CountryMap: React.FC<CountryMapProps> = ({
  selectedUnitId,
  selectedCityId,
  activeRegionFilter,
  activeLens,
  onSelectUnit,
}) => {
  const [hoveredUnitId, setHoveredUnitId] = useState<string | null>(null);
  const [showAllCities, setShowAllCities] = useState<boolean>(false);
  const [hudCollapsed, setHudCollapsed] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const draggingRef = useRef<{ active: boolean; startX: number; startY: number; origX: number; origY: number }>({
    active: false,
    startX: 0,
    startY: 0,
    origX: 0,
    origY: 0,
  });

  const activeLensMeta = useMemo(
    () => LENS_OPTIONS.find((l) => l.id === activeLens) ?? LENS_OPTIONS[0],
    [activeLens]
  );

  const hoveredUnit = useMemo(
    () => ADMIN_UNITS.find((u) => u.id === hoveredUnitId) ?? null,
    [hoveredUnitId]
  );

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (zoom <= 1) return;
    draggingRef.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      origX: pan.x,
      origY: pan.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!draggingRef.current.active) return;
    const dx = (e.clientX - draggingRef.current.startX) / zoom;
    const dy = (e.clientY - draggingRef.current.startY) / zoom;
    setPan({
      x: Math.max(-300, Math.min(300, draggingRef.current.origX + dx)),
      y: Math.max(-200, Math.min(200, draggingRef.current.origY + dy)),
    });
  };

  const handleMouseUp = () => {
    draggingRef.current.active = false;
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const visibleUnits = useMemo(() => {
    if (activeRegionFilter === 'all') return ADMIN_UNITS;
    return ADMIN_UNITS.filter((u) => u.regionId === activeRegionFilter);
  }, [activeRegionFilter]);

  const visibleUnitIds = useMemo(
    () => new Set(visibleUnits.map((u) => u.id)),
    [visibleUnits]
  );

  return (
    <section className="relative w-full bg-gradient-to-b from-slate-100 via-sky-50/40 to-slate-100 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 relative">
        {/* Top-left Collapsible HUD */}
        <div className="hidden md:block absolute top-7 left-9 z-20 max-w-xs">
          <div className="bg-white/92 backdrop-blur-md border border-slate-200/90 rounded-2xl shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => setHudCollapsed((v) => !v)}
              className="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 text-left hover:bg-slate-50 transition-colors"
            >
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-amber-600">
                  테마 렌즈 · {activeLensMeta.shortLabel}
                </div>
                <div className="text-xs font-bold text-slate-900">
                  {activeLensMeta.label}
                </div>
              </div>
              {hudCollapsed ? (
                <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
              ) : (
                <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
              )}
            </button>
            {!hudCollapsed && (
              <div className="px-3.5 pb-3 pt-0.5 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                {activeLensMeta.desc}
              </div>
            )}
          </div>
        </div>

        {/* Top-center Hover Tooltip */}
        {hoveredUnit && (
          <div className="pointer-events-none absolute top-6 left-1/2 -translate-x-1/2 z-30 bg-slate-900/95 text-white px-4 py-2 rounded-xl shadow-lg border border-slate-700 flex items-center gap-3 text-xs">
            <span className="font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
              {hoveredUnit.code}
            </span>
            <div>
              <span className="font-bold text-sm">{hoveredUnit.nameKo}</span>
              <span className="text-slate-300 ml-1.5">({hoveredUnit.nameLocal})</span>
            </div>
            <span className="text-slate-400">·</span>
            <span className="text-slate-200">주도: {hoveredUnit.capitalKo}</span>
            <span className="text-slate-400">·</span>
            <span className="text-amber-300 font-semibold">{hoveredUnit.populationText}</span>
          </div>
        )}

        {/* Top-right Controls */}
        <div className="absolute top-7 right-6 sm:right-9 z-20 flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setShowAllCities((v) => !v)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/95 border border-slate-200 shadow-sm text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            title="도시 마커 밀도 전환"
          >
            {showAllCities ? (
              <Eye className="w-3.5 h-3.5 text-indigo-600" />
            ) : (
              <EyeOff className="w-3.5 h-3.5 text-slate-500" />
            )}
            <span className="hidden sm:inline">
              {showAllCities ? '전체 도시' : '주도만'}
            </span>
          </button>

          <div className="flex items-center bg-white/95 border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(3.5, +(z + 0.5).toFixed(1)))}
              className="p-1.5 text-slate-700 hover:bg-slate-100"
              title="확대"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(1, +(z - 0.5).toFixed(1)))}
              className="p-1.5 text-slate-700 hover:bg-slate-100 border-l border-slate-200"
              title="축소"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            {zoom > 1 && (
              <button
                type="button"
                onClick={resetView}
                className="p-1.5 text-amber-700 hover:bg-amber-50 border-l border-slate-200"
                title="초기화"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* SVG Map Canvas */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden relative">
          <svg
            viewBox="0 0 1000 580"
            className={`w-full h-auto max-h-[560px] select-none ${
              zoom > 1 ? 'cursor-grab active:cursor-grabbing' : ''
            }`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <defs>
              <radialGradient id="seaBg" cx="50%" cy="45%" r="65%">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.45" />
              </radialGradient>
            </defs>

            <rect x="0" y="0" width="1000" height="580" fill="url(#seaBg)" />

            <g
              transform={`translate(500, 290) scale(${zoom}) translate(${-500 + pan.x}, ${
                -290 + pan.y
              })`}
            >
              {/* Surrounding Sea & Geographic Labels */}
              <text
                x="180"
                y="180"
                className="fill-slate-400/70 text-[11px] font-medium tracking-widest"
              >
                대서양 (ATLÁNTICO)
              </text>
              <text
                x="785"
                y="435"
                className="fill-slate-400/70 text-[11px] font-medium tracking-widest"
              >
                지중해 (MEDITERRÁNEO)
              </text>
              <text
                x="445"
                y="32"
                className="fill-slate-400/60 text-[10px] font-medium tracking-wider"
              >
                비스케이만 · 칸타브리아해
              </text>

              {/* Canarias Inset Frame */}
              <g>
                <rect
                  x={CANARIAS_INSET_BOX.x}
                  y={CANARIAS_INSET_BOX.y}
                  width={CANARIAS_INSET_BOX.width}
                  height={CANARIAS_INSET_BOX.height}
                  rx={12}
                  fill="#f8fafc"
                  stroke="#94a3b8"
                  strokeWidth={1.2}
                  strokeDasharray="4 3"
                />
                <text
                  x={CANARIAS_INSET_BOX.x + 10}
                  y={CANARIAS_INSET_BOX.y + 16}
                  className="fill-slate-500 text-[10px] font-semibold"
                >
                  카나리아 제도 (대서양 · 위치 축척 인셋)
                </text>
              </g>

              {/* Autonomous Community & City Polygons */}
              {ADMIN_UNITS.map((unit) => {
                const d = REGION_PATHS[unit.id];
                if (!d) return null;
                const isSelected = selectedUnitId === unit.id;
                const isHovered = hoveredUnitId === unit.id;
                const isDimmed = !visibleUnitIds.has(unit.id);
                const fill = getUnitFill(unit, activeLens, isSelected);

                return (
                  <path
                    key={unit.id}
                    d={d}
                    fill={fill}
                    fillOpacity={isDimmed ? 0.22 : isHovered ? 0.92 : 0.86}
                    stroke={isSelected ? '#0f172a' : isHovered ? '#334155' : '#ffffff'}
                    strokeWidth={isSelected ? 2.2 : isHovered ? 1.5 : 1.1}
                    strokeLinejoin="round"
                    className="cursor-pointer transition-colors duration-150"
                    onMouseEnter={() => setHoveredUnitId(unit.id)}
                    onMouseLeave={() => setHoveredUnitId(null)}
                    onClick={() => onSelectUnit(unit.id)}
                  />
                );
              })}

              {/* Corridors Overlay */}
              {activeLens === 'corridors' &&
                CORRIDORS.map((corridor) => {
                  const pts = corridor.pathCoords
                    .map((c) => projectCoord(c).join(','))
                    .join(' ');
                  return (
                    <polyline
                      key={corridor.id}
                      points={pts}
                      fill="none"
                      stroke={corridor.color}
                      strokeWidth={3.2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="6 4"
                      className="pointer-events-none opacity-85"
                    />
                  );
                })}

              {/* Enlarged clickable targets for Ceuta & Melilla */}
              {(['ceu', 'mel'] as const).map((enclaveId) => {
                const unit = ADMIN_UNITS.find((u) => u.id === enclaveId);
                const centroid = REGION_CENTROIDS[enclaveId];
                if (!unit || !centroid) return null;
                const isSelected = selectedUnitId === enclaveId;
                const isDimmed = !visibleUnitIds.has(enclaveId);
                return (
                  <g
                    key={enclaveId}
                    className="cursor-pointer"
                    opacity={isDimmed ? 0.3 : 1}
                    onMouseEnter={() => setHoveredUnitId(enclaveId)}
                    onMouseLeave={() => setHoveredUnitId(null)}
                    onClick={() => onSelectUnit(enclaveId)}
                  >
                    <circle
                      cx={centroid[0]}
                      cy={centroid[1]}
                      r={isSelected ? 8 : 6.5}
                      fill={isSelected ? '#0f172a' : getUnitFill(unit, activeLens, false)}
                      stroke="#ffffff"
                      strokeWidth={1.6}
                    />
                    <text
                      x={centroid[0]}
                      y={centroid[1] + 15}
                      textAnchor="middle"
                      className="fill-slate-700 text-[9px] font-bold pointer-events-none"
                    >
                      {unit.shortNameKo}
                    </text>
                  </g>
                );
              })}

              {/* Region Labels */}
              {ADMIN_UNITS.map((unit) => {
                if (unit.id === 'ceu' || unit.id === 'mel') return null;
                const centroid = REGION_CENTROIDS[unit.id];
                if (!centroid) return null;
                const isSelected = selectedUnitId === unit.id;
                const isDimmed = !visibleUnitIds.has(unit.id);
                const labelY = unit.id === 'can' ? centroid[1] + 28 : centroid[1] + 3;
                return (
                  <text
                    key={`lbl-${unit.id}`}
                    x={centroid[0]}
                    y={labelY}
                    textAnchor="middle"
                    opacity={isDimmed ? 0.3 : 1}
                    className={`pointer-events-none text-[10px] font-bold ${
                      isSelected ? 'fill-white' : 'fill-slate-800'
                    }`}
                    style={{
                      paintOrder: 'stroke',
                      stroke: isSelected ? '#0f172a' : '#ffffff',
                      strokeWidth: isSelected ? 2.5 : 2.2,
                      strokeLinejoin: 'round',
                    }}
                  >
                    {unit.shortNameKo}
                  </text>
                );
              })}

              {/* City Markers */}
              {ADMIN_UNITS.map((unit) => {
                if (!visibleUnitIds.has(unit.id)) return null;
                return unit.cities.map((city, idx) => {
                  const isPrimary = idx === 0 || city.role === 'capital_largest' || city.role === 'capital';
                  if (!showAllCities && !isPrimary) return null;
                  if (unit.id === 'ceu' || unit.id === 'mel') return null;
                  const [cx, cy] = projectCoord(city.coord);
                  const isCitySelected = selectedCityId === city.id;
                  return (
                    <g
                      key={city.id}
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectUnit(unit.id, city.id);
                      }}
                    >
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isCitySelected ? 5.2 : isPrimary ? 3.5 : 2.6}
                        fill={
                          isCitySelected
                            ? '#ef4444'
                            : isPrimary
                            ? '#0f172a'
                            : '#475569'
                        }
                        stroke="#ffffff"
                        strokeWidth={1.2}
                      />
                      {(showAllCities || isCitySelected) && (
                        <text
                          x={cx + 6}
                          y={cy + 3}
                          className="fill-slate-800 text-[8.5px] font-semibold pointer-events-none"
                          style={{
                            paintOrder: 'stroke',
                            stroke: '#ffffff',
                            strokeWidth: 2,
                          }}
                        >
                          {city.nameKo}
                        </text>
                      )}
                    </g>
                  );
                });
              })}
            </g>
          </svg>

          {/* Bottom Legend Bar */}
          <div className="px-4 py-2.5 bg-slate-50/95 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              {activeLensMeta.legendItems.map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <span
                    className="w-3 h-3 rounded-sm border border-black/10 inline-block"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-700 font-medium">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-slate-500">
              <Maximize2 className="w-3.5 h-3.5" />
              <span>자치주/자치시 또는 도시 마커를 클릭하면 상세 대시보드가 열립니다</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

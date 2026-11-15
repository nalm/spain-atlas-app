import { useMemo, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import {
  BarChart3,
  Crown,
  GitCompare,
  Globe2,
  MapPin,
  Search,
  X,
} from 'lucide-react';
import { CompareModal } from './components/CompareModal';
import { CountryMap } from './components/CountryMap';
import { HierarchyModal } from './components/HierarchyModal';
import { OverviewPanel } from './components/OverviewPanel';
import { StatsModal } from './components/StatsModal';
import { UnitDetail } from './components/UnitDetail';
import { ADMIN_UNITS, UNIT_MAP } from './data/atlasData';
import { ALL_PROVINCES } from './data/provincesData';
import {
  LENS_OPTIONS,
  MACRO_REGIONS,
  MACRO_REGION_ORDER,
} from './data/countryConfig';
import { Lens, MacroRegionId } from './types/atlas';

export function App() {
  const [selectedUnitId, setSelectedUnitId] = useState<string>('mad');
  const [selectedCityId, setSelectedCityId] = useState<string | null>('madrid');
  const [activeRegionFilter, setActiveRegionFilter] = useState<
    MacroRegionId | 'all'
  >('all');
  const [activeLens, setActiveLens] = useState<Lens>('none');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  const [hierarchyOpen, setHierarchyOpen] = useState<boolean>(false);
  const [compareOpen, setCompareOpen] = useState<boolean>(false);
  const [statsOpen, setStatsOpen] = useState<boolean>(false);

  const selectedUnit = UNIT_MAP[selectedUnitId] ?? ADMIN_UNITS[0];

  const handleSelectUnit = (unitId: string, cityId?: string) => {
    const target = UNIT_MAP[unitId];
    if (!target) return;
    setSelectedUnitId(unitId);
    setSelectedCityId(cityId ?? target.cities[0]?.id ?? null);
    setSearchOpen(false);
    setSearchQuery('');
  };

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    const results: { type: 'unit' | 'city' | 'province'; unitId: string; cityId?: string; label: string; sub: string }[] = [];
    for (const u of ADMIN_UNITS) {
      if (
        u.nameKo.toLowerCase().includes(q) ||
        u.nameEn.toLowerCase().includes(q) ||
        u.nameLocal.toLowerCase().includes(q) ||
        u.code.toLowerCase().includes(q)
      ) {
        results.push({
          type: 'unit',
          unitId: u.id,
          label: u.nameKo,
          sub: `${u.nameLocal} · ${u.capitalKo}`,
        });
      }
      for (const c of u.cities) {
        if (
          c.nameKo.toLowerCase().includes(q) ||
          c.nameEn.toLowerCase().includes(q)
        ) {
          results.push({
            type: 'city',
            unitId: u.id,
            cityId: c.id,
            label: `${c.nameKo} (${u.shortNameKo})`,
            sub: `${c.nameEn} · ${c.populationText}`,
          });
        }
      }
    }
    for (const p of ALL_PROVINCES) {
      if (
        p.nameKo.toLowerCase().includes(q) ||
        p.nameLocal.toLowerCase().includes(q)
      ) {
        const parent = UNIT_MAP[p.unitId];
        results.push({
          type: 'province',
          unitId: p.unitId,
          label: `${p.nameKo} (${parent?.shortNameKo ?? p.unitId})`,
          sub: `INE ${p.ineCode} · 주도 ${p.capitalKo} · 약 ${p.populationMan}만 명`,
        });
      }
    }
    return results.slice(0, 10);
  }, [searchQuery]);

  const quickUnits = useMemo(() => {
    if (activeRegionFilter === 'all') return ADMIN_UNITS;
    return ADMIN_UNITS.filter((u) => u.regionId === activeRegionFilter);
  }, [activeRegionFilter]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 via-amber-400 to-red-600 flex items-center justify-center shadow-sm font-black text-slate-900 text-sm">
              ES
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-extrabold tracking-tight leading-none">
                스페인 인터랙티브 아틀라스
              </h1>
              <p className="text-[11px] text-slate-400 mt-1">
                17개 자치주 + 2개 자치시 · 역사·지리·AVE·한국 인연 탐색기
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-xs sm:max-w-sm">
            <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 focus-within:border-amber-400">
              <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setSearchOpen(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchOpen(true);
                }}
                placeholder="자치주·도시 검색 (예: 마드리드, 바르셀로나, 라스팔마스)"
                className="w-full bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {searchOpen && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 mt-1.5 bg-white text-slate-900 rounded-2xl border border-slate-200 shadow-xl overflow-hidden z-50">
                {searchResults.map((res) => (
                  <button
                    key={`${res.type}-${res.unitId}-${res.cityId ?? ''}`}
                    type="button"
                    onClick={() => handleSelectUnit(res.unitId, res.cityId)}
                    className="w-full px-3.5 py-2.5 text-left hover:bg-amber-50 flex items-center justify-between border-b border-slate-100 last:border-b-0"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        {res.label}
                      </div>
                      <div className="text-[11px] text-slate-500">{res.sub}</div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {res.type === 'unit'
                        ? '자치단위'
                        : res.type === 'province'
                        ? '소속 주'
                        : '도시'}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3 Global Modal Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setHierarchyOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Crown className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">왕국·행정계층</span>
              <span className="sm:hidden">계층</span>
            </button>
            <button
              type="button"
              onClick={() => setCompareOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <GitCompare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">비교</span>
            </button>
            <button
              type="button"
              onClick={() => setStatsOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">전국 통계</span>
            </button>
          </div>
        </div>

        {/* 2-Row Macro-Region & Thematic Lens Bar */}
        <div className="bg-slate-950/70 border-t border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 space-y-2">
            {/* Row 1: Macro-region filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[11px] font-bold text-slate-400 mr-1 shrink-0">
                권역:
              </span>
              <button
                type="button"
                onClick={() => setActiveRegionFilter('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                  activeRegionFilter === 'all'
                    ? 'bg-white text-slate-900'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                }`}
              >
                전체 (19)
              </button>
              {MACRO_REGION_ORDER.map((rId) => {
                const meta = MACRO_REGIONS[rId];
                const isActive = activeRegionFilter === rId;
                return (
                  <button
                    key={rId}
                    type="button"
                    onClick={() => setActiveRegionFilter(isActive ? 'all' : rId)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0 flex items-center gap-1.5 transition-colors ${
                      isActive
                        ? 'bg-amber-400 text-slate-900'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: meta.color }}
                    />
                    {meta.nameKo}
                  </button>
                );
              })}
            </div>

            {/* Row 2: Thematic Lenses */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[11px] font-bold text-slate-400 mr-1 shrink-0">
                렌즈:
              </span>
              {LENS_OPTIONS.map((lens) => {
                const isActive = activeLens === lens.id;
                return (
                  <button
                    key={lens.id}
                    type="button"
                    onClick={() => setActiveLens(lens.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                      isActive
                        ? 'bg-indigo-500 text-white shadow-sm'
                        : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {lens.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <CountryMap
          selectedUnitId={selectedUnitId}
          selectedCityId={selectedCityId}
          activeRegionFilter={activeRegionFilter}
          activeLens={activeLens}
          onSelectUnit={handleSelectUnit}
        />

        {/* Quick Unit Selector Bar */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-bold text-slate-400 mr-1 shrink-0 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> 빠른 선택:
            </span>
            {quickUnits.map((u) => {
              const isSelected = u.id === selectedUnitId;
              return (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => handleSelectUnit(u.id)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {u.shortNameKo}
                </button>
              );
            })}
          </div>
        </div>

        <UnitDetail
          unit={selectedUnit}
          selectedCityId={selectedCityId}
          onSelectCity={(cId) => setSelectedCityId(cId)}
        />

        <OverviewPanel
          activeLens={activeLens}
          activeRegionFilter={activeRegionFilter}
          onSelectRegionFilter={setActiveRegionFilter}
          onSelectUnit={(uId) => {
            handleSelectUnit(uId);
            document
              .getElementById('detail-section')
              ?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-amber-400" />
            <span>
              <strong className="text-white">spain.nalm.info</strong> · 스페인 인터랙티브 역사·지리 아틀라스
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-slate-500">형제 아틀라스:</span>
            <a
              href="https://china.nalm.info"
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-amber-300 transition-colors"
            >
              중국 아틀라스
            </a>
            <span>·</span>
            <a
              href="https://japan.nalm.info"
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-amber-300 transition-colors"
            >
              일본 아틀라스
            </a>
            <span>·</span>
            <a
              href="https://usa.nalm.info"
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-amber-300 transition-colors"
            >
              미국 아틀라스
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <HierarchyModal
        isOpen={hierarchyOpen}
        onClose={() => setHierarchyOpen(false)}
      />
      <CompareModal
        isOpen={compareOpen}
        onClose={() => setCompareOpen(false)}
      />
      <StatsModal
        isOpen={statsOpen}
        onClose={() => setStatsOpen(false)}
        onSelectUnit={(uId) => handleSelectUnit(uId)}
      />
      <Analytics />
    </div>
  );
}

export default App;

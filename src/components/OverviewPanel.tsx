import React from 'react';
import { BookOpen, Compass, Layers } from 'lucide-react';
import { ADMIN_UNITS } from '../data/atlasData';
import {
  LENS_OPTIONS,
  MACRO_REGIONS,
  MACRO_REGION_ORDER,
  SPAIN_TRIVIA,
} from '../data/countryConfig';
import { Lens, MacroRegionId } from '../types/atlas';

interface OverviewPanelProps {
  activeLens: Lens;
  activeRegionFilter: MacroRegionId | 'all';
  onSelectRegionFilter: (region: MacroRegionId | 'all') => void;
  onSelectUnit: (unitId: string) => void;
}

export const OverviewPanel: React.FC<OverviewPanelProps> = ({
  activeLens,
  activeRegionFilter,
  onSelectRegionFilter,
  onSelectUnit,
}) => {
  const lensMeta =
    LENS_OPTIONS.find((l) => l.id === activeLens) ?? LENS_OPTIONS[0];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Active Lens Guide */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-100 text-amber-700 shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-600">
              현재 활성 렌즈 · {lensMeta.shortLabel}
            </div>
            <h3 className="text-base font-extrabold text-slate-900">
              {lensMeta.label}
            </h3>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              {lensMeta.desc}
            </p>
          </div>
        </div>
      </div>

      {/* 5 Macro-Region Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            스페인 5대 지리·역사 권역 (17개 자치주 + 2개 자치시)
          </h3>
          {activeRegionFilter !== 'all' && (
            <button
              type="button"
              onClick={() => onSelectRegionFilter('all')}
              className="text-xs font-semibold text-indigo-600 hover:underline"
            >
              전체 권역 보기
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {MACRO_REGION_ORDER.map((rId) => {
            const meta = MACRO_REGIONS[rId];
            const units = ADMIN_UNITS.filter((u) => u.regionId === rId);
            const isActive = activeRegionFilter === rId;
            return (
              <div
                key={rId}
                className={`rounded-2xl bg-white border p-4 transition-all ${
                  isActive
                    ? 'border-slate-900 ring-2 ring-slate-900/10 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <button
                    type="button"
                    onClick={() => onSelectRegionFilter(isActive ? 'all' : rId)}
                    className={`px-2 py-0.5 rounded-lg text-[11px] font-bold ${meta.badgeBg} ${meta.badgeText}`}
                  >
                    {meta.nameKo}
                  </button>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {units.length}개 단위
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {meta.shortDesc}
                </p>
                <div className="flex flex-wrap gap-1">
                  {units.map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => onSelectUnit(u.id)}
                      className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-900 hover:text-white text-[11px] font-semibold text-slate-700 transition-colors"
                    >
                      {u.shortNameKo}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Spain Trivia & Confusing Names */}
      <div>
        <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 mb-3">
          <BookOpen className="w-4 h-4 text-amber-600" />
          스페인 지명·행정 상식 가이드
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SPAIN_TRIVIA.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm"
            >
              <span className="inline-block px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[11px] font-bold mb-2">
                {item.tag}
              </span>
              <h4 className="text-sm font-bold text-slate-900 mb-1.5">
                {item.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.summary}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

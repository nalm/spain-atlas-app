import React, { useState } from 'react';
import { GitCompare, X } from 'lucide-react';
import {
  ADMIN_UNITS,
  AREA_RANK,
  formatAreaKm2,
  formatUsd,
  GDP_RANK,
  POPULATION_RANK,
  UNIT_MAP,
} from '../data/atlasData';
import { MACRO_REGIONS } from '../data/countryConfig';
import { COMPARE_PRESETS } from '../data/signatureTopic';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(['mad', 'cat', 'and']);

  if (!isOpen) return null;

  const handleSlotChange = (slotIdx: number, newId: string) => {
    setSelectedIds((prev) => {
      const next = [...prev];
      next[slotIdx] = newId;
      return next;
    });
  };

  const units = selectedIds.map((id) => UNIT_MAP[id]).filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-5xl max-h-[88vh] flex flex-col overflow-hidden">
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <GitCompare className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-lg font-extrabold">스페인 자치주 · 자치시 비교</h2>
              <p className="text-xs text-slate-300">
                최대 3개 행정 단위의 인구·면적·1인당 GRDP·역사 계보를 나란히 비교합니다
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Presets */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 mr-1">추천 프리셋:</span>
          {COMPARE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => setSelectedIds([...preset.unitIds])}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-amber-400 hover:bg-amber-50 text-xs font-semibold text-slate-700 transition-colors"
              title={preset.desc}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Comparison Grid */}
        <div className="p-6 overflow-y-auto space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[0, 1, 2].map((slotIdx) => {
              const currentId = selectedIds[slotIdx] ?? '';
              return (
                <div key={slotIdx}>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">
                    비교 대상 {slotIdx + 1}
                  </label>
                  <select
                    value={currentId}
                    onChange={(e) => handleSlotChange(slotIdx, e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="">-- 선택 안 함 --</option>
                    {ADMIN_UNITS.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.nameKo} ({u.code})
                      </option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {units.map((u) => {
              const macro = MACRO_REGIONS[u.regionId];
              return (
                <div
                  key={u.id}
                  className="rounded-2xl border border-slate-200 p-4 bg-slate-50/50 space-y-3"
                >
                  <div>
                    <span
                      className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${macro.badgeBg} ${macro.badgeText}`}
                    >
                      {macro.nameKo}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 mt-1">
                      {u.nameKo}
                    </h3>
                    <div className="text-xs text-slate-500">{u.nameLocal}</div>
                  </div>

                  <div className="space-y-2 text-xs border-t border-slate-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-slate-500">인구</span>
                      <span className="font-bold text-slate-900">
                        {u.populationText} ({POPULATION_RANK[u.id]}위)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">면적</span>
                      <span className="font-bold text-slate-900">
                        {formatAreaKm2(u.areaKm2)} ({AREA_RANK[u.id]}위)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">1인당 GRDP</span>
                      <span className="font-bold text-slate-900">
                        {formatUsd(u.gdpPerCapitaUsd)} ({GDP_RANK[u.id]}위)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">주도</span>
                      <span className="font-semibold text-slate-800">{u.capitalKo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">역사 왕국</span>
                      <span className="font-semibold text-amber-700">{u.kingdomLineage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">소속 주</span>
                      <span className="font-semibold text-slate-800">
                        {u.provincesCount > 0 ? `${u.provincesCount}개 주` : '자치시'}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200">
                    <div className="text-[11px] font-bold text-slate-500 mb-1">공용어</div>
                    <div className="text-xs font-semibold text-indigo-700">
                      {u.coOfficialLanguages.join(' · ')}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200">
                    <div className="text-[11px] font-bold text-slate-500 mb-1">핵심 산업</div>
                    <div className="flex flex-wrap gap-1">
                      {u.keyIndustries.map((ind) => (
                        <span
                          key={ind}
                          className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[11px] text-slate-700"
                        >
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

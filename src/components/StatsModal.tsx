import React, { useMemo, useState } from 'react';
import { ArrowUpDown, BarChart3, X } from 'lucide-react';
import {
  ADMIN_UNITS,
  formatAreaKm2,
  formatUsd,
  SPAIN_TOTAL_AREA_KM2,
  SPAIN_TOTAL_POPULATION_MAN,
} from '../data/atlasData';
import { MACRO_REGIONS, MACRO_REGION_ORDER } from '../data/countryConfig';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectUnit: (unitId: string) => void;
}

type SortKey = 'populationMan' | 'areaKm2' | 'gdpPerCapitaUsd' | 'provincesCount';

export const StatsModal: React.FC<StatsModalProps> = ({
  isOpen,
  onClose,
  onSelectUnit,
}) => {
  const [sortKey, setSortKey] = useState<SortKey>('populationMan');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  const sortedUnits = useMemo(() => {
    return [...ADMIN_UNITS].sort((a, b) => {
      const diff = a[sortKey] - b[sortKey];
      return sortAsc ? diff : -diff;
    });
  }, [sortKey, sortAsc]);

  if (!isOpen) return null;

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc((v) => !v);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-5xl max-h-[88vh] flex flex-col overflow-hidden">
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BarChart3 className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-lg font-extrabold">
                스페인 전국 통계 · 19개 자치주·자치시 순위
              </h2>
              <p className="text-xs text-slate-300">
                총 인구 약 {SPAIN_TOTAL_POPULATION_MAN.toLocaleString('ko-KR')}만 명 · 총 면적{' '}
                {formatAreaKm2(SPAIN_TOTAL_AREA_KM2)} · 50개 주(Provincia)
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

        <div className="p-6 overflow-y-auto space-y-6">
          {/* Macro-region summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {MACRO_REGION_ORDER.map((rId) => {
              const meta = MACRO_REGIONS[rId];
              const units = ADMIN_UNITS.filter((u) => u.regionId === rId);
              const pop = units.reduce((acc, u) => acc + u.populationMan, 0);
              const area = units.reduce((acc, u) => acc + u.areaKm2, 0);
              return (
                <div
                  key={rId}
                  className="rounded-2xl border border-slate-200 p-3.5 bg-slate-50/70"
                >
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${meta.badgeBg} ${meta.badgeText}`}
                  >
                    {meta.nameKo}
                  </span>
                  <div className="text-sm font-extrabold text-slate-900 mt-1.5">
                    약 {pop.toLocaleString('ko-KR')}만 명
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {formatAreaKm2(area)} · {units.length}개 단위
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sortable Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                  <th className="p-3 font-bold">#</th>
                  <th className="p-3 font-bold">자치주 · 자치시</th>
                  <th className="p-3 font-bold">권역</th>
                  <th className="p-3 font-bold">주도</th>
                  <th className="p-3 font-bold">
                    <button
                      type="button"
                      onClick={() => toggleSort('populationMan')}
                      className="flex items-center gap-1 hover:text-slate-950"
                    >
                      인구(만) <ArrowUpDown className="w-3.5 h-3.5" />
                    </button>
                  </th>
                  <th className="p-3 font-bold">
                    <button
                      type="button"
                      onClick={() => toggleSort('areaKm2')}
                      className="flex items-center gap-1 hover:text-slate-950"
                    >
                      면적(㎢) <ArrowUpDown className="w-3.5 h-3.5" />
                    </button>
                  </th>
                  <th className="p-3 font-bold">
                    <button
                      type="button"
                      onClick={() => toggleSort('gdpPerCapitaUsd')}
                      className="flex items-center gap-1 hover:text-slate-950"
                    >
                      1인당 GRDP <ArrowUpDown className="w-3.5 h-3.5" />
                    </button>
                  </th>
                  <th className="p-3 font-bold">
                    <button
                      type="button"
                      onClick={() => toggleSort('provincesCount')}
                      className="flex items-center gap-1 hover:text-slate-950"
                    >
                      소속 주 <ArrowUpDown className="w-3.5 h-3.5" />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {sortedUnits.map((u, idx) => {
                  const macro = MACRO_REGIONS[u.regionId];
                  return (
                    <tr
                      key={u.id}
                      onClick={() => {
                        onSelectUnit(u.id);
                        onClose();
                      }}
                      className="hover:bg-amber-50/50 cursor-pointer transition-colors"
                    >
                      <td className="p-3 font-mono text-slate-400">{idx + 1}</td>
                      <td className="p-3">
                        <span className="font-bold text-slate-900">{u.nameKo}</span>
                        <span className="text-slate-400 ml-1.5 text-[11px]">{u.code}</span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${macro.badgeBg} ${macro.badgeText}`}
                        >
                          {macro.nameKo}
                        </span>
                      </td>
                      <td className="p-3 text-slate-700">{u.capitalKo}</td>
                      <td className="p-3 font-bold text-slate-900">
                        {u.populationMan.toLocaleString('ko-KR')}만
                      </td>
                      <td className="p-3 text-slate-700">{formatAreaKm2(u.areaKm2)}</td>
                      <td className="p-3 font-semibold text-indigo-700">
                        {formatUsd(u.gdpPerCapitaUsd)}
                      </td>
                      <td className="p-3 text-slate-600">
                        {u.provincesCount > 0 ? `${u.provincesCount}개` : '자치시'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

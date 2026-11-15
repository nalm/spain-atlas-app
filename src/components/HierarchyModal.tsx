import React, { useMemo, useState } from 'react';
import { Crown, Layers, MapPin, Search, ShieldCheck, X } from 'lucide-react';
import { ADMIN_UNITS, formatAreaKm2, UNIT_MAP } from '../data/atlasData';
import { ALL_PROVINCES } from '../data/provincesData';
import {
  SPAIN_HIERARCHY_LEVELS,
  SPAIN_KINGDOM_MATRIX,
  SPAIN_SPECIAL_REGIMES,
} from '../data/signatureTopic';

interface HierarchyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HierarchyModal: React.FC<HierarchyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [tab, setTab] = useState<'kingdoms' | 'hierarchy' | 'regimes' | 'provinces'>('kingdoms');
  const [provUnitFilter, setProvUnitFilter] = useState<string>('all');
  const [provQuery, setProvQuery] = useState<string>('');

  const filteredProvinces = useMemo(() => {
    const q = provQuery.trim().toLowerCase();
    return ALL_PROVINCES.filter((p) => {
      if (provUnitFilter !== 'all' && p.unitId !== provUnitFilter) return false;
      if (!q) return true;
      return (
        p.nameKo.toLowerCase().includes(q) ||
        p.nameLocal.toLowerCase().includes(q) ||
        p.capitalKo.toLowerCase().includes(q) ||
        p.ineCode.includes(q)
      );
    }).sort((a, b) => a.ineCode.localeCompare(b.ineCode));
  }, [provUnitFilter, provQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-5xl max-h-[88vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold">
              스페인 왕국 계보 · 행정계층 · 특수 자치제도
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              중세 이베리아 왕국에서 현대 17개 자치주 + 2개 자치시 체제까지의 구조
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 pt-3 bg-slate-50 border-b border-slate-200 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setTab('kingdoms')}
            className={`px-4 py-2 rounded-t-xl text-xs font-bold flex items-center gap-1.5 border-b-2 transition-colors ${
              tab === 'kingdoms'
                ? 'bg-white text-amber-700 border-amber-500'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            <Crown className="w-4 h-4" />
            중세 왕국 vs 현대 자치주 대조표
          </button>
          <button
            type="button"
            onClick={() => setTab('hierarchy')}
            className={`px-4 py-2 rounded-t-xl text-xs font-bold flex items-center gap-1.5 border-b-2 transition-colors ${
              tab === 'hierarchy'
                ? 'bg-white text-indigo-700 border-indigo-500'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            4단계 지방행정 계층
          </button>
          <button
            type="button"
            onClick={() => setTab('regimes')}
            className={`px-4 py-2 rounded-t-xl text-xs font-bold flex items-center gap-1.5 border-b-2 transition-colors ${
              tab === 'regimes'
                ? 'bg-white text-emerald-700 border-emerald-500'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            포랄 조세자치 · 특수 지위
          </button>
          <button
            type="button"
            onClick={() => setTab('provinces')}
            className={`px-4 py-2 rounded-t-xl text-xs font-bold flex items-center gap-1.5 border-b-2 transition-colors ${
              tab === 'provinces'
                ? 'bg-white text-rose-700 border-rose-500'
                : 'text-slate-600 border-transparent hover:text-slate-900'
            }`}
          >
            <MapPin className="w-4 h-4" />
            50개 주(Provincias) 전체
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {tab === 'kingdoms' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                    <th className="p-3 font-bold">역사 왕국 · 문명</th>
                    <th className="p-3 font-bold">핵심 정체성</th>
                    <th className="p-3 font-bold">현대 자치주·자치시</th>
                    <th className="p-3 font-bold">공용어</th>
                    <th className="p-3 font-bold">대표 유산</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {SPAIN_KINGDOM_MATRIX.map((row) => (
                    <tr key={row.kingdomKo} className="hover:bg-amber-50/40">
                      <td className="p-3 align-top min-w-[150px]">
                        <div className="font-bold text-slate-900">{row.kingdomKo}</div>
                        <div className="text-[11px] text-slate-500">{row.kingdomLocal}</div>
                        <div className="text-[11px] text-amber-700 font-semibold mt-0.5">
                          {row.era}
                        </div>
                      </td>
                      <td className="p-3 align-top text-slate-700 leading-relaxed min-w-[200px]">
                        {row.coreIdentity}
                      </td>
                      <td className="p-3 align-top min-w-[180px]">
                        <div className="flex flex-wrap gap-1">
                          {row.modernUnits.map((mu) => (
                            <span
                              key={mu}
                              className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-semibold text-[11px]"
                            >
                              {mu}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-3 align-top text-indigo-700 font-semibold min-w-[130px]">
                        {row.coOfficialLangs}
                      </td>
                      <td className="p-3 align-top text-slate-600 min-w-[170px]">
                        {row.signatureLegacy}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'hierarchy' && (
            <div className="space-y-3">
              {SPAIN_HIERARCHY_LEVELS.map((lv) => (
                <div
                  key={lv.level}
                  className="rounded-2xl border border-slate-200 p-4 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-lg bg-indigo-600 text-white text-xs font-bold">
                        {lv.level}단계
                      </span>
                      <h3 className="text-sm font-extrabold text-slate-900">
                        {lv.nameKo}{' '}
                        <span className="font-normal text-slate-500">
                          ({lv.nameLocal})
                        </span>
                      </h3>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {lv.summary}
                    </p>
                    <div className="text-[11px] text-slate-500">
                      <span className="font-semibold text-slate-700">예시:</span>{' '}
                      {lv.examples}
                    </div>
                  </div>
                  <div className="shrink-0 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-center">
                    <div className="text-[10px] uppercase tracking-wider text-slate-400">
                      전국 규모
                    </div>
                    <div className="text-xs font-extrabold text-indigo-700 mt-0.5">
                      {lv.countText}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'regimes' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SPAIN_SPECIAL_REGIMES.map((sr) => (
                <div
                  key={sr.regimeName}
                  className="rounded-2xl border border-slate-200 p-4 bg-emerald-50/30"
                >
                  <h3 className="text-sm font-extrabold text-slate-900">
                    {sr.regimeName}
                  </h3>
                  <div className="text-xs font-semibold text-emerald-700 mt-1">
                    적용 대상: {sr.targetUnits}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed mt-2">
                    {sr.fiscalOrAdminFeature}
                  </p>
                  <div className="mt-3 pt-2.5 border-t border-slate-200 text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-700">역사·법적 근거:</span>{' '}
                    {sr.historicalBasis}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'provinces' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={provUnitFilter}
                    onChange={(e) => setProvUnitFilter(e.target.value)}
                    className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  >
                    <option value="all">전체 17개 자치주 (50개 주)</option>
                    {ADMIN_UNITS.filter((u) => u.provincesCount > 0).map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.nameKo} ({u.provincesCount}개 주)
                      </option>
                    ))}
                  </select>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={provQuery}
                      onChange={(e) => setProvQuery(e.target.value)}
                      placeholder="주 이름·주도·INE 코드 검색"
                      className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-400"
                    />
                  </div>
                </div>
                <div className="text-xs font-bold text-slate-600">
                  표시 중: <span className="text-rose-700">{filteredProvinces.length}개 주</span> / 50개
                </div>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                      <th className="p-2.5 font-bold">INE</th>
                      <th className="p-2.5 font-bold">주 (Provincia)</th>
                      <th className="p-2.5 font-bold">소속 자치주</th>
                      <th className="p-2.5 font-bold">주도</th>
                      <th className="p-2.5 font-bold">인구</th>
                      <th className="p-2.5 font-bold">면적</th>
                      <th className="p-2.5 font-bold">특징</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredProvinces.map((p) => {
                      const parent = UNIT_MAP[p.unitId];
                      return (
                        <tr key={p.ineCode} className="hover:bg-rose-50/40">
                          <td className="p-2.5 font-mono font-bold text-slate-500">
                            {p.ineCode}
                          </td>
                          <td className="p-2.5">
                            <span className="font-bold text-slate-900">{p.nameKo}</span>
                            <span className="text-[11px] text-slate-400 ml-1">
                              ({p.nameLocal})
                            </span>
                          </td>
                          <td className="p-2.5 font-semibold text-indigo-700">
                            {parent?.shortNameKo ?? p.unitId}
                          </td>
                          <td className="p-2.5 text-slate-700">{p.capitalKo}</td>
                          <td className="p-2.5 font-semibold text-slate-900">
                            {p.populationMan.toLocaleString('ko-KR')}만
                          </td>
                          <td className="p-2.5 text-slate-600">
                            {formatAreaKm2(p.areaKm2)}
                          </td>
                          <td className="p-2.5 text-slate-600 max-w-xs">{p.note}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

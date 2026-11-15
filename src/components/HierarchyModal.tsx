import React, { useState } from 'react';
import { Crown, Layers, ShieldCheck, X } from 'lucide-react';
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
  const [tab, setTab] = useState<'kingdoms' | 'hierarchy' | 'regimes'>('kingdoms');

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
        </div>
      </div>
    </div>
  );
};

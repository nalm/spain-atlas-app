import React from 'react';
import {
  Building2,
  Compass,
  Crown,
  Globe2,
  HeartHandshake,
  Landmark,
  MapPin,
  Sparkles,
  Train,
  Users,
  Utensils,
} from 'lucide-react';
import {
  AREA_RANK,
  formatAreaKm2,
  formatUsd,
  GDP_RANK,
  POPULATION_RANK,
} from '../data/atlasData';
import { MACRO_REGIONS } from '../data/countryConfig';
import { AdminUnitInfo } from '../types/atlas';

interface UnitDetailProps {
  unit: AdminUnitInfo;
  selectedCityId: string | null;
  onSelectCity: (cityId: string) => void;
}

export const UnitDetail: React.FC<UnitDetailProps> = ({
  unit,
  selectedCityId,
  onSelectCity,
}) => {
  const macro = MACRO_REGIONS[unit.regionId];
  const activeCity =
    unit.cities.find((c) => c.id === selectedCityId) ?? unit.cities[0];

  return (
    <section id="detail-section" className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white px-6 py-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-lg bg-amber-400/20 text-amber-300 font-mono text-xs font-bold border border-amber-400/30">
                  {unit.code}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold ${macro.badgeBg} ${macro.badgeText}`}
                >
                  {macro.nameKo}
                </span>
                <span className="px-2.5 py-0.5 rounded-lg bg-white/10 text-slate-200 text-xs font-medium">
                  {unit.type}
                </span>
                {unit.coOfficialLanguages.length > 1 && (
                  <span className="px-2.5 py-0.5 rounded-lg bg-indigo-500/30 text-indigo-200 text-xs font-semibold border border-indigo-400/30">
                    이중 공용어: {unit.coOfficialLanguages.join(' · ')}
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {unit.nameKo}
                <span className="text-slate-300 font-normal text-lg sm:text-xl ml-2.5">
                  {unit.nameLocal}
                </span>
              </h2>
              <p className="text-amber-300/95 text-sm font-medium mt-1">
                {unit.nicknameKo} · “{unit.slogan}”
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/15 text-right min-w-[200px]">
              <div className="text-[11px] uppercase tracking-wider text-slate-300">
                자치주 수도 / 최대 도시
              </div>
              <div className="text-sm font-bold text-white mt-0.5">
                {unit.capitalKo} ({unit.capitalPopText})
              </div>
              {!unit.isCapitalLargest && (
                <div className="text-xs text-amber-300 mt-0.5">
                  최대 도시: {unit.largestCityKo} ({unit.largestCityPopText})
                </div>
              )}
            </div>
          </div>

          {/* 4-Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
            <div className="bg-white/10 rounded-2xl p-3.5 border border-white/10">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>인구</span>
                <span className="px-1.5 py-0.5 rounded bg-white/15 text-white font-semibold">
                  전국 {POPULATION_RANK[unit.id]}위
                </span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-white mt-1">
                {unit.populationText}
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-3.5 border border-white/10">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>면적</span>
                <span className="px-1.5 py-0.5 rounded bg-white/15 text-white font-semibold">
                  전국 {AREA_RANK[unit.id]}위
                </span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-white mt-1">
                {formatAreaKm2(unit.areaKm2)}
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-3.5 border border-white/10">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>1인당 GRDP (추정)</span>
                <span className="px-1.5 py-0.5 rounded bg-white/15 text-white font-semibold">
                  전국 {GDP_RANK[unit.id]}위
                </span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-white mt-1">
                {formatUsd(unit.gdpPerCapitaUsd)}
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-3.5 border border-white/10">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>{unit.specialMetricLabel}</span>
                <span className="px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-200 font-semibold">
                  자치헌장 {unit.statuteYear}
                </span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-white mt-1">
                {unit.provincesCount > 0 ? `${unit.specialMetricValue}개 주` : `${unit.specialMetricValue}년 승격`}
              </div>
            </div>
          </div>
        </div>

        {/* Highlight Story Banner */}
        <div className="bg-amber-50/80 border-b border-amber-200/70 px-6 py-3.5 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-slate-800 leading-relaxed font-medium">
            {unit.highlightStory}
          </p>
        </div>

        {/* City Quick-Selector Tabs */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> 주요 도시 스포트라이트:
          </span>
          {unit.cities.map((city) => {
            const isActive = activeCity?.id === city.id;
            return (
              <button
                key={city.id}
                type="button"
                onClick={() => onSelectCity(city.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {city.nameKo}
                <span className={`ml-1.5 ${isActive ? 'text-amber-300' : 'text-slate-400'}`}>
                  {city.populationText}
                </span>
              </button>
            );
          })}
        </div>

        {/* 3-Column Detail Dashboard */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1: Cities & Geography */}
          <div className="space-y-5">
            {activeCity && (
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700">
                    <Building2 className="w-4 h-4" />
                    <span>도시 포커스</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-500">
                    {activeCity.populationText}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  {activeCity.nameKo}{' '}
                  <span className="text-sm font-normal text-slate-500">
                    {activeCity.nameEn}
                  </span>
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed mt-2">
                  {activeCity.note}
                </p>
                {activeCity.landmarks && activeCity.landmarks.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {activeCity.landmarks.map((lm) => (
                      <span
                        key={lm}
                        className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-medium text-slate-700"
                      >
                        {lm}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="rounded-2xl border border-slate-200 p-4">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mb-2">
                <Compass className="w-4 h-4 text-emerald-600" />
                지리 · 기후 · 핵심 산업
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed mb-3">
                {unit.characteristicsSummary}
              </p>
              <div className="text-xs text-slate-600 mb-2">
                <span className="font-semibold text-slate-800">기후대:</span> {unit.climateZone}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {unit.keyIndustries.map((ind) => (
                  <span
                    key={ind}
                    className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-semibold"
                  >
                    {ind}
                  </span>
                ))}
              </div>
              {unit.corridors.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-600">
                  <Train className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>연계 회랑: {unit.corridors.join(', ')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Column 2: History & Timeline */}
          <div className="space-y-5">
            <div className="rounded-2xl border border-slate-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Crown className="w-4 h-4 text-amber-600" />
                  역사적 계보 · 연표
                </h4>
                <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[11px] font-semibold">
                  {unit.kingdomLineage}
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed mb-4">
                {unit.historicalRoleSummary}
              </p>
              <div className="space-y-3 border-l-2 border-amber-200 pl-3.5">
                {unit.historicalEvents.map((ev) => (
                  <div key={ev.title} className="relative">
                    <span className="text-[11px] font-bold text-amber-700 block">
                      {ev.era}
                    </span>
                    <div className="text-xs font-bold text-slate-900">{ev.title}</div>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      {ev.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mb-3">
                <Users className="w-4 h-4 text-indigo-600" />
                대표 인물
              </h4>
              <div className="space-y-3">
                {unit.famousPeople.map((p) => (
                  <div key={p.name} className="bg-slate-50 rounded-xl p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">
                        {p.name}{' '}
                        <span className="font-normal text-slate-500">({p.era})</span>
                      </span>
                      <span className="text-[11px] font-semibold text-indigo-700">
                        {p.role}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {p.connectionType}
                    </div>
                    <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Korean Ties, Landmarks & Culture */}
          <div className="space-y-5">
            <div className="rounded-2xl border border-pink-200 bg-pink-50/40 p-4">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mb-3">
                <HeartHandshake className="w-4 h-4 text-pink-600" />
                한국과의 인연
              </h4>
              <div className="space-y-3">
                {unit.koreanHistory.map((kh) => (
                  <div key={kh.title} className="bg-white rounded-xl p-3 border border-pink-100">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2 py-0.5 rounded bg-pink-100 text-pink-800 text-[10px] font-bold">
                        {kh.category}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500">
                        {kh.year}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 mt-1.5">
                      {kh.title}
                    </div>
                    <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                      {kh.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mb-2.5">
                <Landmark className="w-4 h-4 text-sky-600" />
                랜드마크 · 유네스코 · 국립공원
              </h4>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {unit.landmarks.map((lm) => (
                  <span
                    key={lm}
                    className="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-800 text-[11px] font-semibold"
                  >
                    {lm}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {unit.nationalParksAndHeritage.map((np) => (
                  <span
                    key={np}
                    className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium flex items-center gap-1"
                  >
                    <Globe2 className="w-3 h-3 text-emerald-600" />
                    {np}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mb-2.5">
                <Utensils className="w-4 h-4 text-orange-600" />
                대표 미식 · 지역 문화
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {unit.specialtyAndCulture.map((sp) => (
                  <span
                    key={sp}
                    className="px-2.5 py-1 rounded-lg bg-orange-50 text-orange-800 text-[11px] font-semibold"
                  >
                    {sp}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

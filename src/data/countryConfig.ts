import {
  CorridorMeta,
  LensMeta,
  MacroRegionId,
  MacroRegionMeta,
  SpainTriviaItem,
} from '../types/atlas';

export const MACRO_REGIONS: Record<MacroRegionId, MacroRegionMeta> = {
  central: {
    id: 'central',
    nameKo: '중부 메세타·수도권',
    nameEn: 'Meseta Central & Madrid',
    shortDesc: '마드리드 수도권을 중심으로 카스티야 고원과 엑스트레마두라를 잇는 이베리아 내륙 핵심부',
    color: '#fbbf24',
    hoverColor: '#f59e0b',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-800',
    borderColor: 'border-amber-300',
  },
  north: {
    id: 'north',
    nameKo: '북부 대서양·피레네',
    nameEn: 'España Verde & Pirineos',
    shortDesc: '갈리시아·아스투리아스의 녹색 대서양 해안과 바스크·나바라의 공업·포랄 자치권 벨트',
    color: '#34d399',
    hoverColor: '#10b981',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-800',
    borderColor: 'border-emerald-300',
  },
  east: {
    id: 'east',
    nameKo: '동부 지중해·아라곤',
    nameEn: 'Arco Mediterráneo & Aragón',
    shortDesc: '카탈루냐·발렌시아·발레아레스와 아라곤을 잇는 지중해 해양 무역·관광·첨단산업 중심지',
    color: '#60a5fa',
    hoverColor: '#3b82f6',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-800',
    borderColor: 'border-blue-300',
  },
  south: {
    id: 'south',
    nameKo: '남부 안달루시아·무르시아',
    nameEn: 'Andalucía & Murcia',
    shortDesc: '알안달루스 이슬람·무데하르 유산과 플라멩코, 유럽 최대 원예·태양광 지대가 공존하는 남부',
    color: '#fb7185',
    hoverColor: '#f43f5e',
    badgeBg: 'bg-rose-100',
    badgeText: 'text-rose-800',
    borderColor: 'border-rose-300',
  },
  insular_african: {
    id: 'insular_african',
    nameKo: '도서·북아프리카',
    nameEn: 'Canarias, Ceuta & Melilla',
    shortDesc: '대서양 화산 군도 카나리아와 지중해 건너 북아프리카 해안의 자치시 세우타·멜리야',
    color: '#a78bfa',
    hoverColor: 'text-violet-600',
    badgeBg: 'bg-violet-100',
    badgeText: 'text-violet-800',
    borderColor: 'border-violet-300',
  },
};

export const MACRO_REGION_ORDER: MacroRegionId[] = [
  'central',
  'north',
  'east',
  'south',
  'insular_african',
];

export const LENS_OPTIONS: LensMeta[] = [
  {
    id: 'none',
    label: '기본 권역별 지도',
    shortLabel: '권역 기본',
    desc: '스페인 17개 자치주와 2개 자치시를 5대 지리·역사 권역 색상으로 탐색합니다.',
    legendItems: [
      { label: '중부 메세타·수도권', color: '#fbbf24' },
      { label: '북부 대서양·피레네', color: '#34d399' },
      { label: '동부 지중해·아라곤', color: '#60a5fa' },
      { label: '남부 안달루시아·무르시아', color: '#fb7185' },
      { label: '도서·북아프리카', color: '#a78bfa' },
    ],
  },
  {
    id: 'kingdoms',
    label: '중세 왕국·레콘키스타',
    shortLabel: '왕국 계보',
    desc: '카스티야·아라곤·레온·나바라·그라나다 등 레콘키스타 시대의 왕국 뿌리가 현대 자치주 경계에 남긴 흔적을 봅니다.',
    legendItems: [
      { label: '카스티야 연합왕국', color: '#f59e0b' },
      { label: '아라곤 연합왕국', color: '#3b82f6' },
      { label: '레온·아스투리아스 계보', color: '#10b981' },
      { label: '나바라 왕국', color: '#8b5cf6' },
      { label: '알안달루스·그라나다', color: '#f43f5e' },
    ],
  },
  {
    id: 'corridors',
    label: 'AVE 고속철·경제 회랑',
    shortLabel: 'AVE·경제 회랑',
    desc: '마드리드 아토차/차마르틴에서 방사형으로 뻗는 AVE 고속철도망과 지중해·에브로·대서양 산업 회랑을 시각화합니다.',
    legendItems: [
      { label: '마드리드-바르셀로나-프랑스 회랑', color: '#ef4444' },
      { label: '지중해 회랑 (카탈루냐-안달루시아)', color: '#3b82f6' },
      { label: '마드리드-남부 AVE (세비야·말라가)', color: '#f59e0b' },
      { label: '북부·대서양 공업·항만 벨트', color: '#10b981' },
    ],
  },
  {
    id: 'languages',
    label: '공용어·문화·순례길',
    shortLabel: '언어·문화',
    desc: '스페인어(카스티야어) 외에 헌법상 지역 공용어(카탈루냐어·바스크어·갈리시아어·발렌시아어)를 쓰는 자치주와 산티아고 순례길을 구분합니다.',
    legendItems: [
      { label: '이중 공용어 자치주 (카탈루냐·바스크·갈리시아 등)', color: '#6366f1' },
      { label: '카스티야어 단일 공용어 (방언·역사어 보호 포함)', color: '#cbd5e1' },
    ],
  },
  {
    id: 'geography',
    label: '지형·기후대',
    shortLabel: '지형·기후',
    desc: '건조한 메세타 고원, 비가 잦은 북부 녹색 스페인(España Verde), 지중해성 해안, 아열대 카나리아를 비교합니다.',
    legendItems: [
      { label: '대서양 해양성 (녹색 스페인)', color: '#10b981' },
      { label: '대륙성 지중해 (메세타 고원)', color: '#f59e0b' },
      { label: '전형적 지중해성 (동부·남부)', color: '#38bdf8' },
      { label: '아열대·건조 마카로네시아 (카나리아)', color: '#a855f7' },
    ],
  },
  {
    id: 'korea',
    label: '한국과의 인연',
    shortLabel: '한국 인연',
    desc: '라스팔마스 원양어업 기지, 마드리드·바르셀로나 한인사회와 한국기업, 태권도·K-컬처, 산티아고 순례길 한국인 열풍을 조명합니다.',
    legendItems: [
      { label: '핵심 교류 거점 (마드리드·바르셀로나·카나리아 등)', color: '#ec4899' },
      { label: '산업·문화·순례길 연계 지역', color: '#fbcfe8' },
    ],
  },
];

export const CORRIDORS: CorridorMeta[] = [
  {
    id: 'mad_bcn',
    nameKo: '마드리드–에브로–바르셀로나 AVE 회랑',
    nameEn: 'Corredor Madrid–Zaragoza–Barcelona',
    color: '#ef4444',
    summary: '마드리드에서 사라고사를 거쳐 바르셀로나·프랑스 국경으로 이어지는 스페인 최대 GDP·고속철(AVE) 대동맥.',
    unitIds: ['mad', 'clm', 'ara', 'cat'],
    pathCoords: [
      [-3.7038, 40.4168],
      [-0.8891, 41.6488],
      [2.1734, 41.3851],
    ],
  },
  {
    id: 'mediterranean',
    nameKo: '지중해 연안 회랑',
    nameEn: 'Corredor Mediterráneo',
    color: '#2563eb',
    summary: '카탈루냐·발렌시아·무르시아·안달루시아 동부 항만과 농식품·관광·자동차 클러스터를 잇는 지중해 벨트.',
    unitIds: ['cat', 'val', 'mur', 'and'],
    pathCoords: [
      [2.1734, 41.3851],
      [-0.3763, 39.4699],
      [-1.1307, 37.9922],
      [-4.4214, 36.7213],
    ],
  },
  {
    id: 'mad_south',
    nameKo: '마드리드–안달루시아 AVE 회랑',
    nameEn: 'Corredor Sur (Madrid–Sevilla/Málaga)',
    color: '#d97706',
    summary: '1992년 세비야 엑스포와 함께 개통한 스페인 최초의 AVE 노선으로, 라만차 평원을 지나 코르도바·세비야·말라가로 이어집니다.',
    unitIds: ['mad', 'clm', 'and'],
    pathCoords: [
      [-3.7038, 40.4168],
      [-4.7794, 37.8882],
      [-5.9845, 37.3891],
    ],
  },
  {
    id: 'atlantic_north',
    nameKo: '북부 대서양·칸타브리아 회랑',
    nameEn: 'Corredor Atlántico & Cantábrico',
    color: '#059669',
    summary: '갈리시아 비고·아코루냐 항만에서 아스투리아스·칸타브리아를 거쳐 빌바오·산세바스티안·나바라 공업지대로 연결됩니다.',
    unitIds: ['gal', 'ast', 'cnt', 'pva', 'nav', 'cyl'],
    pathCoords: [
      [-8.4115, 43.3623],
      [-5.8494, 43.3619],
      [-3.8099, 43.4623],
      [-2.935, 43.263],
      [-1.6458, 42.8125],
    ],
  },
];

export const SPAIN_TRIVIA: SpainTriviaItem[] = [
  {
    title: '카스티야 이 레온 vs 카스티야-라만차, 왜 둘로 나뉘었을까?',
    tag: '지명·역사',
    summary:
      '과거 스페인을 통일한 카스티야 왕국은 중앙 산맥(시스테마 센트랄)을 기준으로 북쪽 구(舊) 카스티야+레온과 남쪽 신(新) 카스티야로 나뉘었습니다. 1983년 자치주 체제에서 북부는 카스티야 이 레온(9개 주), 마드리드는 단독 자치주, 남부는 라만차 평원을 합쳐 카스티야-라만차(5개 주)가 되었습니다.',
  },
  {
    title: '바스크와 나바라의 특별한 세금 자치권(Concierto Económico)',
    tag: '행정·재정',
    summary:
      '스페인 17개 자치주 중 바스크와 나바라만은 중앙정부가 세금을 걷어 배분하는 일반 체제가 아니라, 자치주가 직접 세금을 징수해 중앙정부 몫(Cupo)만 납부하는 중세 포랄(Foral) 특권을 헌법으로 보장받습니다.',
  },
  {
    title: '아프리카 대륙에 있는 스페인 도시, 세우타와 멜리야',
    tag: '영토·지리',
    summary:
      '세우타와 멜리야는 모로코 북부 해안에 위치한 스페인의 2개 자치시(Ciudades Autónomas)이자 유럽연합(EU)의 유일한 아프리카 대륙 육상 국경입니다. 15~17세기부터 스페인·포르투갈 영토로 이어져 카나리아 제도와는 또 다른 지정학적 위상을 지닙니다.',
  },
  {
    title: '스페인어만 있는 게 아니다 — 4개 공용어 체계',
    tag: '언어·문화',
    summary:
      '스페인 헌법 제3조는 카스티야어(스페인어)를 전국 공용어로 정하면서도, 카탈루냐어(카탈루냐·발레아레스), 발렌시아어(발렌시아), 바스크어(바스크·나바라 북부), 갈리시아어(갈리시아)의 지역 공용어 지위를 인정합니다. 바스크어는 인도유럽어족조차 아닌 고립어입니다.',
  },
  {
    title: '마드리드는 16세기에야 수도가 된 신생 도시였다',
    tag: '수도 변천',
    summary:
      '서고트 왕국과 중세 카스티야의 수도는 톨레도·부르고스·바야돌리드였습니다. 1561년 펠리페 2세가 이베리아 반도의 정중앙이라는 지리적 이점과 사냥터, 기존 귀족 세력 견제를 위해 소도시 마드리드로 궁정을 옮기며 대도시로 성장했습니다.',
  },
];

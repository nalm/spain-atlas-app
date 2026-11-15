import {
  ComparePreset,
  HierarchyLevel,
  SpainKingdomRow,
  SpainSpecialRegimeRow,
} from '../types/atlas';

export const SPAIN_HIERARCHY_LEVELS: HierarchyLevel[] = [
  {
    level: 1,
    nameKo: '광역자치주·자치시',
    nameLocal: 'Comunidad Autónoma / Ciudad Autónoma',
    countText: '17개 자치주 + 2개 자치시 (총 19개)',
    summary:
      '1978년 민주헌법에 따라 성립한 스페인 최상위 지방분권 단위. 독자적인 의회(Parlamento/Cortes), 행정부, 자치헌장(Estatuto de Autonomía)을 가지며 교육·보건·치안(일부)·문화 권한을 행사합니다.',
    examples: '안달루시아, 카탈루냐, 마드리드, 바스크 / 세우타, 멜리야',
  },
  {
    level: 2,
    nameKo: '주 (프로빈시아)',
    nameLocal: 'Provincia',
    countText: '50개 주',
    summary:
      '1833년 하비에르 데 부르고스가 프랑스 데파르트망을 모델로 구획한 행정 단위. 17개 자치주 중 7개는 1개의 주가 곧 자치주(단일주 자치주: 마드리드, 아스투리아스 등)이며, 카스티야 이 레온은 가장 많은 9개 주를 포함합니다.',
    examples: '바르셀로나주, 세비야주, 비스카야주, 라스팔마스주',
  },
  {
    level: 3,
    nameKo: '군·역사지구 (코마르카)',
    nameLocal: 'Comarca',
    countText: '지역별 상이 (카탈루냐 42개 등)',
    summary:
      '주와 기초자치단체 사이의 지리·역사적 소권역. 카탈루냐·아라곤·갈리시아 등 일부 자치주에서는 행정 권한을 가진 공식 단위로 운영되며, 그 외 지역에서는 전통 지리 명칭으로 쓰입니다.',
    examples: '바르셀로네스(Barcelonès), 리오하 알타, 라 만차',
  },
  {
    level: 4,
    nameKo: '기초자치단체 (무니시피오)',
    nameLocal: 'Municipio',
    countText: '8,131개 시·읍·면',
    summary:
      '시장(Alcalde)과 시의회(Ayuntamiento)로 구성되는 기초 생활행정 단위. 마드리드시(인구 330만 명)부터 인구 수십 명 규모의 카스티야 산간 마을까지 모두 동등한 법적 지위를 가집니다.',
    examples: '마드리드시, 바르셀로나시, 빌바오시, 산티아고 데 콤포스텔라',
  },
];

export const SPAIN_KINGDOM_MATRIX: SpainKingdomRow[] = [
  {
    kingdomKo: '카스티야 연합왕국',
    kingdomLocal: 'Corona de Castilla',
    era: '1230–1716 (핵심 중추)',
    coreIdentity: '레콘키스타를 주도한 최대 왕국으로, 아메리카 대항해와 스페인어(카스티야어) 확산의 중심.',
    modernUnits: ['마드리드', '카스티야 이 레온', '카스티야-라만차', '칸타브리아', '라 리오하', '엑스트레마두라', '무르시아', '안달루시아(서부·중부)', '카나리아 제도'],
    coOfficialLangs: '스페인어(카스티야어)',
    signatureLegacy: '톨레도·부르고스·세비야 대성당, 살라망카 대학, 라만차 돈키호테',
  },
  {
    kingdomKo: '아라곤 연합왕국',
    kingdomLocal: 'Corona de Aragón',
    era: '1162–1716 (지중해 제국)',
    coreIdentity: '아라곤 왕국과 카탈루냐 공국의 연합으로 출발해 발렌시아·발레아레스·남부 이탈리아까지 뻗은 지중해 해양 강국.',
    modernUnits: ['아라곤', '카탈루냐', '발렌시아', '발레아레스 제도'],
    coOfficialLangs: '스페인어 + 카탈루냐어 / 발렌시아어',
    signatureLegacy: '바르셀로나 고딕 지구, 팔라우 데 라 무지카, 발렌시아 라 론하',
  },
  {
    kingdomKo: '레온·아스투리아스 계보',
    kingdomLocal: 'Reino de Asturias y León',
    era: '718–1230 (레콘키스타 기원)',
    coreIdentity: '722년 코바돈가 전투로 이슬람 세력에 맞선 최초의 기독교 왕국 계보. 대서양 북서부 켈트·산악 문화권.',
    modernUnits: ['아스투리아스', '갈리시아', '카스티야 이 레온(서부 레온 지역)'],
    coOfficialLangs: '스페인어 + 갈리시아어 (아스투리아스어 보호)',
    signatureLegacy: '산티아고 데 콤포스텔라 대성당, 피코스 데 에우로파, 헤라클레스의 탑',
  },
  {
    kingdomKo: '나바라 왕국 & 바스크 영주령',
    kingdomLocal: 'Reino de Navarra / Señoríos Vascos',
    era: '824–1512 (피레네 관문)',
    coreIdentity: '프랑스·스페인 국경 피레네 산맥의 전략적 왕국과 독자적 관습법(Fueros)을 지켜온 바스크 3주.',
    modernUnits: ['나바라', '바스크'],
    coOfficialLangs: '스페인어 + 바스크어(Euskara)',
    signatureLegacy: '포랄 조세자치권(Concierto Económico), 팜플로나 산 페르민, 빌바오·게르니카',
  },
  {
    kingdomKo: '알안달루스·그라나다 왕국',
    kingdomLocal: 'Al-Ándalus / Reino Nazarí de Granada',
    era: '711–1492 (이슬람 황금기)',
    coreIdentity: '코르도바 칼리프국부터 1492년 함락된 최후의 나스리드 그라나다 왕국까지 약 800년간 이베리아 남부에 꽃핀 이슬람·유대·기독교 융합 문명.',
    modernUnits: ['안달루시아(그라나다·코르도바·세비야)', '세우타', '멜리야'],
    coOfficialLangs: '스페인어 (아랍어·베르베르어 지명 다수 잔존)',
    signatureLegacy: '알함브라 궁전, 코르도바 메스키타, 세비야 알카사르·히랄다',
  },
];

export const SPAIN_SPECIAL_REGIMES: SpainSpecialRegimeRow[] = [
  {
    regimeName: '포랄 조세자치 체제 (Régimen Foral)',
    targetUnits: '바스크(País Vasco), 나바라(Navarra)',
    fiscalOrAdminFeature:
      '자체 세무청이 소득세·법인세 등을 직접 징수한 뒤 중앙정부에 국가 공통경비 분담금(Cupo/Aportación)만 납부하는 최고 수준의 재정 자치.',
    historicalBasis: '중세 바스크·나바라의 전통 관습법(Fueros)을 1978년 헌법 부칙 제1조로 계승',
  },
  {
    regimeName: '역사적 민족체 (Nacionalidades Históricas)',
    targetUnits: '카탈루냐, 바스크, 갈리시아 (및 안달루시아 등)',
    fiscalOrAdminFeature:
      '1978년 헌법 제151조 신속 경로를 통해 조기에 최고 수준의 자치권·자체 경찰(Mossos d’Esquadra, Ertzaintza)·공용어 교육권을 확보.',
    historicalBasis: '스페인 제2공화국(1931~1936) 시기 자치헌장 승인 이력 및 고유 언어·역사 정체성',
  },
  {
    regimeName: '초원격·도서 경제특례 (REF / RUP)',
    targetUnits: '카나리아 제도(Canarias)',
    fiscalOrAdminFeature:
      '유럽연합 최외곽지역(RUP)으로서 스페인 본토 부가가치세(IVA 21%) 대신 저율의 일반간접세(IGIC 7%)와 자유무역지대(ZEC) 혜택을 적용.',
    historicalBasis: '대서양 원격 도서성 보완 및 19세기 자유항(Puertos Francos) 전통',
  },
  {
    regimeName: '북아프리카 자치시 (Ciudades Autónomas)',
    targetUnits: '세우타(Ceuta), 멜리야(Melilla)',
    fiscalOrAdminFeature:
      '자치주보다 한 단계 아래지만 시·의회 권한이 강화된 특수 지위(1995년 자치헌장). 유럽 솅겐 조약의 특수 관세·세제 예외(IPSI) 적용.',
    historicalBasis: '지브롤터 해협·북아프리카 해안의 역사적 스페인 거점 도시',
  },
];

export const COMPARE_PRESETS: ComparePreset[] = [
  {
    id: 'mad_cat_and',
    label: '수도권 vs 지중해 vs 남부 3대 거점',
    desc: '마드리드(정치·금융), 카탈루냐(산업·무역), 안달루시아(인구 1위·관광)의 체급 비교',
    unitIds: ['mad', 'cat', 'and'],
  },
  {
    id: 'foral_twins',
    label: '북부 포랄 자치권 쌍둥이',
    desc: '독자적 조세 자치권을 가진 바스크와 나바라의 1인당 GDP·산업 구조 비교',
    unitIds: ['pva', 'nav'],
  },
  {
    id: 'islands_vs_enclaves',
    label: '도서 vs 북아프리카 자치시',
    desc: '대서양 카나리아 제도, 지중해 발레아레스 제도, 북아프리카 세우타 비교',
    unitIds: ['can', 'bal', 'ceu'],
  },
];

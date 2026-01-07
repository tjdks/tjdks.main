/*************************************************
 * 해양 계산기 - 공통 설정 및 상수
 *************************************************/

// 세트 관련 상수
export const SET_COUNT = 64;

// 골드 가격 (2025년 업데이트)
export const GOLD_PRICES = {
    '1star': { A: 5669, K: 5752, L: 5927 },
    '2star': { CORE: 12231, POTION: 12354, WING: 12527 },
    '3star': { AQUA: 20863, NAUTILUS: 21107, SPINE: 21239 }
};

// 프리미엄 가격 비율
export const PREMIUM_PRICE_RATE = {
    1: 0.05, 2: 0.07, 3: 0.10, 4: 0.15,
    5: 0.20, 6: 0.30, 7: 0.40, 8: 0.50
};

// 1성 - 핵에서 정수로 변환
export const CORE_TO_ESSENCE_1STAR = {
    WG: { guard: 1, wave: 1 },
    WP: { wave: 1, chaos: 1 },
    OD: { chaos: 1, life: 1 },
    VD: { life: 1, decay: 1 },
    ED: { decay: 1, guard: 1 }
};

// 1성 - 정수에서 블록으로 변환
export const ESSENCE_TO_BLOCK_1STAR = {
    guard: { clay: 1 },
    wave: { sand: 2 },
    chaos: { dirt: 4 },
    life: { gravel: 2 },
    decay: { granite: 1 }
};

// 1성 - 핵에서 물고기로 변환
export const CORE_TO_FISH_1STAR = {
    WG: { shrimp: 1 },
    WP: { domi: 1 },
    OD: { herring: 1 },
    VD: { goldfish: 1 },
    ED: { bass: 1 }
};

// 2성 - 에센스 제작 재료 (조합법 변경 반영)
export const ESSENCE_TO_BLOCK_2STAR = {
    guard: { seaweed: 2, oakLeaves: 4 },
    wave: { seaweed: 2, spruceLeaves: 4 },
    chaos: { seaweed: 2, birchLeaves: 4 },
    life: { seaweed: 2, acaciaLeaves: 4 },
    decay: { seaweed: 2, cherryLeaves: 4 }
};

// 2성 - 결정 제작 재료 (조합법 변경 반영)
export const CRYSTAL_TO_MATERIAL_2STAR = {
    vital:   { kelp: 2, lapisBlock: 1 },
    erosion: { kelp: 2, redstoneBlock: 1 },
    defense: { kelp: 2, ironIngot: 1 },
    regen:   { kelp: 2, goldIngot: 1 },
    poison:  { kelp: 2, diamond: 1 }
};

// 3성 - 엘릭서에서 재료로 변환 (조합법 수정 반영)
export const ELIXIR_TO_MATERIAL_3STAR = {
    guard:  { seaSquirt: 1, glassBottle: 3, netherrack: 4 },
    wave:   { seaSquirt: 1, glassBottle: 3, magmaBlock: 2 },
    chaos:  { seaSquirt: 1, glassBottle: 3, soulSoil: 2 },
    life:   { seaSquirt: 1, glassBottle: 3, crimsonStem: 2 },
    decay:  { seaSquirt: 1, glassBottle: 3, warpedStem: 2 }
};

// 3성 - 의약에서 재료로 변환 (조합법 수정 반영)
export const POTION_TO_MATERIAL_3STAR = {
    immortal: { driedKelp: 4, glowBerry: 2, deadTubeCoral: 1 },
    barrier:  { driedKelp: 4, glowBerry: 2, deadBrainCoral: 1 },
    corrupt:  { driedKelp: 4, glowBerry: 2, deadBubbleCoral: 1 },
    frenzy:   { driedKelp: 4, glowBerry: 2, deadFireCoral: 1 },
    venom:    { driedKelp: 4, glowBerry: 2, deadHornCoral: 1 }
};

// 3성 - 의약에서 엘릭서로 변환
export const POTION_TO_ELIXIR_3STAR = {
    immortal: { guard: 1, life: 1 },
    barrier: { guard: 1, wave: 1 },
    corrupt: { chaos: 1, decay: 1 },
    frenzy: { chaos: 1, life: 1 },
    venom: { wave: 1, decay: 1 }
};

// 낚싯대 강화 데이터
export const ROD_DATA = {
    1: { drop: 2, clamRate: 0.01 },
    2: { drop: 2, clamRate: 0.01 },
    3: { drop: 3, clamRate: 0.02 },
    4: { drop: 3, clamRate: 0.02 },
    5: { drop: 3, clamRate: 0.02 },
    6: { drop: 4, clamRate: 0.03 },
    7: { drop: 4, clamRate: 0.03 },
    8: { drop: 4, clamRate: 0.03 },
    9: { drop: 5, clamRate: 0.05 },
    10: { drop: 5, clamRate: 0.05 },
    11: { drop: 5, clamRate: 0.07 },
    12: { drop: 6, clamRate: 0.07 },
    13: { drop: 6, clamRate: 0.09 },
    14: { drop: 7, clamRate: 0.09 },
    15: { drop: 10, clamRate: 0.15 }
};

// 전문가 스킬 데이터
export const EXPERT_SKILLS = {
    storm: [0, 0.05, 0.07, 0.10, 0.15, 0.20],
    clamRefill: [0, 0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.10]
};

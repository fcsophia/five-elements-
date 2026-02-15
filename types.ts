
export interface NameResult {
  name: string;
  pinyin: string;
  meaning: string;
  reasoning: string;
  source?: string;
}

export enum ElementType {
  METAL = '金',
  WOOD = '木',
  WATER = '水',
  FIRE = '火',
  EARTH = '土',
  UNKNOWN = ''
}

export type GivenNameLength = 1 | 2 | 3;

export type GenderType = '男' | '女' | '中性化';

export type NamingStyle = '文雅典兴' | '现代干练' | '平易亲和' | '端庄稳重';

export interface NamingResponse {
  names: NameResult[];
}

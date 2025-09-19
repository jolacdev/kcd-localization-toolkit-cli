import rawCategories from '../../data/categories.json' with { type: 'json' };
import { GameSupportedLanguage } from './constants.ts';

type CategoryKeys =
  | 'alcohol'
  | 'arms'
  | 'arrow'
  | 'axe'
  | 'bodyI'
  | 'bodyII'
  | 'bodyIII'
  | 'bodyIV'
  | 'bow'
  | 'dagger'
  | 'die'
  | 'drink'
  | 'feet'
  | 'food'
  | 'hands'
  | 'headI'
  | 'headII'
  | 'headIII'
  | 'horseBridle'
  | 'horseChanfron'
  | 'horseCover'
  | 'horseShoes'
  | 'huntingSword'
  | 'ingredient'
  | 'key'
  | 'legsI'
  | 'legsII'
  | 'legsIII'
  | 'longSword'
  | 'loreBook'
  | 'mace'
  | 'map'
  | 'misc'
  | 'necklace'
  | 'other'
  | 'polearm'
  | 'potion'
  | 'quest'
  | 'recipe'
  | 'recipeBook'
  | 'ring'
  | 'saber'
  | 'saddle'
  | 'shield'
  | 'shortSword'
  | 'skillBook'
  | 'spurs'
  | 'tool';

type Languages = {
  [lang in GameSupportedLanguage]: string;
};

// TODO: Handle imported categories
const categories: Record<CategoryKeys, Languages> = rawCategories;

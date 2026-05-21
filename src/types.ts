export type AppStep =
  | 'login'
  | 'searching_player'
  | 'player_found'
  | 'select_coins'
  | 'select_booster'
  | 'processing'
  | 'generating'
  | 'processed_success'
  | 're_processing'
  | 'verification';

export type Platform = 'android' | 'ios' | null;

export interface UserSession {
  username: string;
  platform: Platform;
  selectedCoins: number;
  selectedBooster: number;
}

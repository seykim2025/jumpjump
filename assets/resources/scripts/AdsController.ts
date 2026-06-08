export type AdPlacement =
  | 'home_banner'
  | 'game_banner'
  | 'result_banner'
  | 'result_retry'
  | 'result_reward_retry';

export interface InterstitialAdResult {
  shown: boolean;
  completed: boolean;
  error?: string;
}

export interface RewardedAdResult {
  shown: boolean;
  completed: boolean;
  rewarded: boolean;
  error?: string;
}

export const ads = {
  showInterstitialAd: async (options: { placement: AdPlacement }): Promise<InterstitialAdResult> => {
    console.log(`[Ads Mock] Showing Interstitial Ad for placement: ${options.placement}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ shown: true, completed: true });
      }, 500); // mock delay
    });
  },

  showRewardedAd: async (options: { placement: AdPlacement }): Promise<RewardedAdResult> => {
    console.log(`[Ads Mock] Showing Rewarded Ad for placement: ${options.placement}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ shown: true, completed: true, rewarded: true });
      }, 1000); // mock delay
    });
  },
};

import {produce} from 'immer';

export const clearStore = (set: any, InitialStore: any) => {
  set(
    produce((state) => {
      const keys = Object.keys(InitialStore);
      keys.forEach((key) => {
        state[key] = InitialStore[key];
      });
    }),
    true
  );
};

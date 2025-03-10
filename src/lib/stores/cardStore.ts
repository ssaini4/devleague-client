import { writable } from "svelte/store";
import { CardType } from "$lib/api";

type CardCache = {
  [username: string]: {
    [key in CardType]?: string;
  };
};

export const cardCache = writable<CardCache>({});

export function updateCardCache(username: string, type: CardType, url: string) {
  cardCache.update((cache) => {
    if (!cache[username]) {
      cache[username] = {};
    }
    cache[username][type] = url;
    return cache;
  });
}

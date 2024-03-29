import { z } from 'zod';

export const SuitSchema = z.union(
  [
    z.literal('c'),
    z.literal('d'),
    z.literal('h'),
    z.literal('s'),
  ]
);

export const RankSchema = z.union(
  [
    z.literal('A'),
    z.literal('2'),
    z.literal('3'),
    z.literal('4'),
    z.literal('5'),
    z.literal('6'),
    z.literal('7'),
    z.literal('8'),
    z.literal('9'),
    z.literal('T'),
    z.literal('J'),
    z.literal('Q'),
    z.literal('K'),
  ]
);

export const CardSchema = z.object({
  rank: RankSchema,
  suit: SuitSchema,
});

type SuitType = z.infer<typeof SuitSchema>;
type RankType = z.infer<typeof RankSchema>;
export type CardType = z.infer<typeof CardSchema>;

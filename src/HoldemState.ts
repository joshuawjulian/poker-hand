import {z} from 'zod';
import { HoldemActionSchema } from './HoldemPokerActions';

export const HoldemSeatSchema = z.number().int().nonnegative();

export const HoldemSeatActionSchema = z.object({
  seat: HoldemSeatSchema,
  action: HoldemActionSchema
});

export const HoldemSetupSchema = z.object({
  numberOfPlayers: HoldemSeatSchema,
  blindActions: HoldemSeatActionSchema.array(),
  startOrder: HoldemSeatSchema.array()
});

export const HoldemStateSchema = z.object({
  setup: HoldemSetupSchema,
  actions: HoldemSeatActionSchema.array(),
});

export type HoldemStateType = z.infer<typeof HoldemStateSchema>
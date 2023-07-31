import {z} from 'zod';
import { AnteActionSchema, BetActionSchema, BlindActionSchema, CallActionSchema, CheckActionSchema, FlopActionSchema, FoldActionSchema, HoldemActionSchema, PreflopActionSchema, RiverActionSchema, StraddleActionSchema, TurnActionSchema } from './HoldemPokerActions';

export const HoldemSeatSchema = z.number().int().nonnegative();

export const HoldemSeatActionSchema = z.discriminatedUnion('action',
	[
	BetActionSchema.extend({seat: HoldemSeatSchema}),
	FoldActionSchema.extend({seat: HoldemSeatSchema}),
	CheckActionSchema.extend({seat: HoldemSeatSchema}),
	CallActionSchema.extend({seat: HoldemSeatSchema}),
	StraddleActionSchema.extend({seat: HoldemSeatSchema}),
	BlindActionSchema.extend({seat: HoldemSeatSchema}),
	AnteActionSchema.extend({seat: HoldemSeatSchema}),
	PreflopActionSchema,
	FlopActionSchema,
	TurnActionSchema,
	RiverActionSchema
	]
)

export type HoldemSeatActionType = z.infer<typeof HoldemSeatActionSchema>

export const HoldemSeatStackSchema = z.object({
	seat: HoldemSeatSchema,
	stack: z.union([
		z.number().int().nonnegative(),
		z.literal('unknown')
	])
});

export const HoldemSetupSchema = z.object({
  numberOfPlayers: HoldemSeatSchema,
	startingStacks: HoldemSeatStackSchema.array(),
  blindActions: HoldemSeatActionSchema.array(),
  startOrder: HoldemSeatSchema.array().default([])
});

export const HoldemStateSchema = z.object({
  setup: HoldemSetupSchema,
  actions: HoldemSeatActionSchema.array(),
});

export type HoldemStateType = z.infer<typeof HoldemStateSchema>
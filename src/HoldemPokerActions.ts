import {z} from 'zod';
import { CardSchema } from './Card';

export const HoldemSeatSchema = z.number().int().nonnegative();

export const BetActionSchema = z.object({
  action: z.literal('bet'),
  amount: z.number()
});

export const FoldActionSchema = z.object({
  action: z.literal('fold')
});

export const CheckActionSchema = z.object({
  action: z.literal('check')
});

export const CallActionSchema = z.object({
  action: z.literal('call'),
  amount: z.number()
});

export const StraddleActionSchema = z.object({
  action: z.literal('straddle'),
  amount: z.number()
});

export const BlindActionSchema = z.object({
  action: z.literal('blind'),
  amount: z.number()
});

export const AnteActionSchema = z.object({
  action: z.literal('ante'),
  amount: z.number()
});

export const PreflopActionSchema = z.object({
  action: z.literal('preflop')
});

export const FlopActionSchema = z.object({
  action: z.literal('flop'),
  cards: CardSchema.array().length(3)
});

export const TurnActionSchema = z.object({
  action: z.literal('turn'),
  card: CardSchema
});

export const RiverActionSchema = z.object({
  action: z.literal('river'),
  card: CardSchema
});



export const HoldemActionSchema = z.discriminatedUnion('action',
[
	BetActionSchema,
	FoldActionSchema,
	CheckActionSchema,
	CallActionSchema,
	StraddleActionSchema,
	BlindActionSchema,
	AnteActionSchema,
  PreflopActionSchema,
	FlopActionSchema,
	TurnActionSchema,
	RiverActionSchema
]
);

export type HoldemActionType = z.infer<typeof HoldemActionSchema>;
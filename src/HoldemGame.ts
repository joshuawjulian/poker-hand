import { z } from "zod";
import { HoldemSeatSchema } from "./HoldemPokerActions";
import { HoldemStateSchema, HoldemStateType } from "./HoldemState";

export const CheckOptionActionSchema = z.object({
	action: z.literal('check')
});

export const FoldOptionActionSchema = z.object({
	action: z.literal('fold')
});

export const CallOptionActionSchema = z.object({
	action: z.literal('call'),
	amount: z.number()
});

export const BetOptionActionSchema = z.object({
	action: z.literal('bet'),
	min: z.number(),
	max: z.number()
});

export const SeatActionOptionSchema = z.object({
	seat: HoldemSeatSchema,
	possibleActions: z.discriminatedUnion('action',
	[
		CheckOptionActionSchema,
		FoldOptionActionSchema,
		CallOptionActionSchema,
		BetOptionActionSchema
	])
})

export type SeatActionOptionType = z.infer<typeof SeatActionOptionSchema>

function next(state:HoldemStateType): SeatActionOptionType {
	let parsedData = HoldemStateSchema.safeParse(state);
	if(!parsedData.success) throw parsedData.error;
	state = parsedData.data;
}
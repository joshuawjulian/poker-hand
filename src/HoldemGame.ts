import { HoldemStateSchema, HoldemStateType } from "./HoldemState";

function next(state:HoldemStateType) {
	let parsedData = HoldemStateSchema.safeParse(state);
	if(!parsedData.success) throw parsedData.error;
	state = parsedData.data;
}
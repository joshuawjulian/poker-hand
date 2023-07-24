import {
	Action,
	ActionDetail,
	Card,
	largestAmount,
	next,
	PokerGameState,
	push,
	RankArr,
	SuitArr,
	tableActions,
	whichStreet,
} from '../src/poker';
import * as prompts from 'prompts';

//set up a normal 1/2 game
let state: PokerGameState = {
	numberSeats: 5,
	actions: [
		{
			seat: 0,
			action: 'deal',
		},
		{
			seat: 1,
			action: 'blind',
			detail: 1,
		},
		{
			seat: 2,
			action: 'blind',
			detail: 2,
		},
	],
};

const isAllIn: prompts.PromptObject = {
	type: 'confirm',
	name: 'isAllIn',
	message: 'Is this an allin?',
	initial: false,
};

let quit = false;

const onCancel = () => {
	quit = true;
	return false;
};

const getNextAction = async (
	seat: number,
	actions: Action[]
): Promise<Action> => {
	let actionChoices: prompts.Choice[] = [];
	actions.forEach((action) => {
		actionChoices.push({ title: action, value: action });
	});
	let action;
	if (actionChoices.length === 1) {
		actionChoices.push(actionChoices[0]);
	}
	action = (
		await prompts(
			{
				type: 'select',
				name: 'action',
				message: `Actions for ${seat === 0 ? 'dealer' : 'seat ' + seat}?`,
				choices: actionChoices,
				initial: 1,
			},
			{ onCancel }
		)
	).action;
	return action;
};

const askAmount = async (action: Action, min: number = 0) => {
	const askAmount: prompts.PromptObject = {
		type: 'number',
		name: 'amount',
		message: `Amount for ${action}`,
		min,
		initial: min,
	};
	return (await prompts(askAmount, { onCancel })).amount;
};

const validateCard = (card: string) => {
	let errMsg = 'Card must be formated as [Suit][rank]';
	if (card.length !== 2) {
		return errMsg;
	}
	if (RankArr.includes(card.charAt(0)) && SuitArr.includes(card.charAt(1))) {
		return true;
	} else {
		return `Rank must be in ${RankArr} and Suit must be in ${SuitArr}`;
	}
};
const askCard = async (): Promise<Card> => {
	let input;
	const ask: prompts.PromptObject = {
		type: 'text',
		name: 'card',
		message: `Type a card [Suit][rank] ex: As`,
		validate: validateCard,
	};
	input = (await prompts(ask, { onCancel })).card;
	return { rank: input.charAt(0), suit: input.charAt(1) };
};

const getNextActionDetail = async (
	state: PokerGameState,
	seat: number,
	action: Action
) => {
	let allin = false;
	let detail;
	let act: ActionDetail;
	console.log(`getNextActionDetail == ACTION IS |${action}|`);
	if (['bet', 'call'].includes(action)) {
		allin = (await prompts(isAllIn, { onCancel })).isAllIn;

		if ((allin && action === 'call') || action === 'bet')
			detail = await askAmount(action, largestAmount(state));
		else detail = largestAmount(state);
		act = {
			seat,
			action,
			allin,
			detail,
		};
	} else if (action === 'fold' || action === 'check') {
		act = {
			seat,
			action,
		};
	} else if (action === 'deal') {
		let numCards = 1;
		detail = [];
		if (whichStreet(state) === 'preflop') numCards = 3;
		for (let i = 0; i < numCards; i++) {
			detail.push(await askCard());
		}
		act = {
			seat,
			action,
			detail,
		};
	} else if (action === 'end') {
		console.log(`Showdown!`);
		onCancel();
	}

	return act;
};

(async () => {
	while (!quit) {
		tableActions(state);
		const { seat, actions } = next(state);
		console.log(`Next Seat ${seat} choices ${actions}`);
		const action = await getNextAction(seat, actions);
		const act = await getNextActionDetail(state, seat, action);
		state = push(act, state);
		if (act.action === 'end') {
			console.log(`Showdown!`);
			onCancel();
		}
		console.log(JSON.stringify(act));
	}
})();

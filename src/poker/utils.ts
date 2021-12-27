export const shiftOneSeat = (seat: number, numSeats: number): number => {
	return (seat % numSeats) + 1;
};

export const rotateArrayFTB = (arr: any[]): any[] => {
	if (arr.length === 0) return new Array();
	arr.push(arr.splice(0, 1)[0]);

	return arr;
};

export const rotateArrayBTF = (arr: any[]): any[] => {
	if (arr.length === 0) return [];
	arr.unshift(arr.pop());
	return arr;
};

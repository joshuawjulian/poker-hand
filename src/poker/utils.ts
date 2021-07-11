export const shiftOneSeat = (seat: number, numSeats: number): number => {
	return (seat % numSeats) + 1;
};

const Direction = {
	UP: { x: 0, y: -1 },
	UP_RIGHT: { x: 1, y: -1 },
	RIGHT: { x: 1, y: 0 },
	DOWN_RIGHT: { x: 1, y: 1 },
	DOWN: { x: 0, y: 1 },
	DOWN_LEFT: { x: -1, y: 1 },
	LEFT: { x: -1, y: 0 },
	UP_LEFT: { x: -1, y: -1 },
};

function clone2D<T extends { clone(): T }>(array: T[][]): T[][] {
	return array.map((row) => row.map((cell) => cell.clone()));
}

if (import.meta.vitest) {
	const { it, expect, describe } = import.meta.vitest;
	describe('clone2D', () => {
		it('clones a 2d array', () => {
			const arr = [[new Cell()]];
			const clone = clone2D(arr);
			arr[0][0].deathTime = 5;
			expect(clone[0][0].deathTime).toBe(-1);

			arr[0] = [new Cell(5)];
			expect(clone[0][0].deathTime).toBe(-1);
		});
	});
}

function mod(num: number, field: number): number {
	return ((num % field) + field) % field;
}

if (import.meta.vitest) {
	const { it, expect, describe } = import.meta.vitest;
	describe('mod', () => {
		it('finds mod of positive numbers', () => {
			expect(mod(5, 2)).toBe(1);
		});
		it('finds mod of negative numbers', () => {
			expect(mod(-3, 7)).toBe(4);
		});
	});
}

export class Game {
	readonly cells: Cell[][];
	playing = false;

	/**
	 *
	 * @param cells A 2D array of cells or the board size (square)
	 */
	constructor(cells?: Cell[][] | number, playing = false) {
		if (!cells) {
			this.cells = [[]];
		} else if (typeof cells === 'number') {
			this.cells = new Array(cells)
				.fill(0)
				.map(() => new Array(cells).fill(0).map(() => new Cell(0)));
		} else {
			this.cells = clone2D(cells);
		}
		this.playing = playing;
	}

	increment(): Game {
		const board = this.clone();

		for (let row = 0; row < this.cells.length; row++) {
			for (let col = 0; col < this.cells.length; col++) {
				const neighbors = Object.values(Direction).map(({ x, y }) => {
					const newRow = mod(row + y, this.cells.length);
					const newCol = mod(col + x, this.cells[0].length);
					return this.cells[newRow][newCol];
				});
				board.cells[row][col] = this.cells[row][col].increment(neighbors);
			}
		}

		return board;
	}

	toggleCell(row: number, col: number): Game {
		const board = this.clone();

		board.cells[row][col].alive = !board.cells[row][col].alive;

		return board;
	}

	clone(): Game {
		return new Game(clone2D(this.cells), this.playing);
	}
}

export class Cell {
	deathTime: number;

	constructor(deathTime = -1) {
		this.deathTime = deathTime;
	}

	get alive(): boolean {
		return this.deathTime === -1;
	}

	set alive(state: boolean) {
		this.deathTime = state ? -1 : 0;
	}

	get dead(): boolean {
		return !this.alive;
	}

	increment(neighbors: Cell[]): Cell {
		const livingNeighbors = neighbors.reduce((sum, cell) => sum + (cell.alive ? 1 : 0), 0);
		if (livingNeighbors === 3) {
			return new Cell();
		} else if (livingNeighbors === 2) {
			return new Cell(this.dead ? this.deathTime + 1 : this.deathTime);
		} else {
			return new Cell(this.dead ? this.deathTime + 1 : 0);
		}
	}

	clone(): Cell {
		return new Cell(this.deathTime);
	}
}

if (import.meta.vitest) {
	const { it, expect, describe } = import.meta.vitest;
	describe('Cell', () => {
		it('creates a new Cell', () => {
			expect(new Cell().deathTime).toBe(-1);
			expect(new Cell().alive).toBe(true);
			expect(new Cell().dead).toBe(false);
		});
		it('can be killed and revived', () => {
			const cell = new Cell();
			cell.alive = false;
			expect(cell.dead).toBe(true);
			cell.alive = true;
			expect(cell.alive).toBe(true);
		});
		it('can be incremented', () => {
			let cell = new Cell(0);

			const birthNeighbors = [new Cell(), new Cell(), new Cell()];
			cell = cell.increment(birthNeighbors);
			expect(cell.alive).toBe(true);

			const surviveNeighbors = [new Cell(), new Cell()];
			cell = cell.increment(surviveNeighbors);
			expect(cell.alive).toBe(true);

			const deathNeighbors1 = [new Cell()];
			const deathNeighbors2 = [...birthNeighbors, new Cell()];
			cell = cell.increment(deathNeighbors1);
			expect(cell.alive).toBe(false);
			cell = cell.increment(birthNeighbors);
			cell = cell.increment(deathNeighbors2);
			expect(cell.alive).toBe(false);

			cell = cell.increment(surviveNeighbors);
			expect(cell.deathTime).toBe(1);
		});
		it('can be cloned', () => {
			const cell = new Cell();
			const clone = cell.clone();
			expect(clone.deathTime).toBe(cell.deathTime);
		});
	});
}

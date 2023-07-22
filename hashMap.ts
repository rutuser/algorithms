type K = string | number | boolean;

class MyHashMap<T> {
	nItems: number = 0;
	table: Array<[[K, T]]> = new Array<[[K, T]]>(100);

	private calculateHash(key: K): number {
		let hash = 17;
		const keyString = key.toString();

		for (let i = 0; i < keyString.length; i++) {
			hash = (hash * keyString.charCodeAt(i)) % this.table.length;
		}

		return hash;
	}

	private resize(): void {
		const resizedTable = new Array<[[K, T]]>(this.table.length * 2);

		for (let i = 0; i < this.table.length; i++) {
			if (!this.table[i]) break;

			for (let j = 0; j < this.table[i].length; j++) {
				const [key, value] = this.table[i][j];
				const idx = this.calculateHash(key);

				resizedTable[idx].push([key, value]);
			}
		}

		this.table = resizedTable;
	}

	private getLoadFactor(): number {
		return this.nItems / this.table.length;
	}

	public get(key: K): T | undefined {
		const idx = this.calculateHash(key);
		return this.table[idx].find(([_, k]) => k === key)?.[1];
	}

	public set(key: K, value: T): void {
		this.nItems++;
		const loadFactor = this.getLoadFactor();

		if (loadFactor > 0.8) this.resize();

		const idx = this.calculateHash(key);
		this.table[idx].push([key, value]);
	}
}


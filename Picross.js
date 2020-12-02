class Picross
{
	constructor(width, height)
	{
		this.rows = this.create2DArray(height, width);
		this.columns = this.create2DArray(width, height);
	}
	
	create2DArray(firstDimensionLength, secondDimensionLength)
	{	
		let array = [];
			
		for(let i = 0; i < firstDimensionLength; i++)
		{
			let innerArray = [];
						
			for(let j = 0; j < secondDimensionLength; j++)
			{
				innerArray.push(false);
			}

			array.push(innerArray);
		}

		return array;
	}
	
	getWidth()
	{
		return this.columns.length;
	}
	
	getHeight()
	{
		return this.rows.length;
	}
	
	setCell(x, y, state)
	{		
		this.rows[y][x] = state;
		this.columns[x][y] = state;
	}
	
	getRowHint(rowIndex)
	{
		return this.getHintForLine(this.rows[rowIndex]);
	}
	
	getColumnHint(columnIndex)
	{
		return this.getHintForLine(this.columns[columnIndex]);
	}
	
	getHintForLine(line)
	{
		let hints = [];
		
		let isInSerie = false;
		let serieLength = 0;
		
		for(let cell of line)
		{
			if(cell)
			{
				if(isInSerie)
				{
					serieLength++;
				}
				else
				{
					isInSerie = true;
					serieLength = 1;
				}
			}
			else
			{
				if(isInSerie)
				{
					isInSerie = false;
					hints.push(serieLength);
				}
			}
		}
		
		if(isInSerie)
		{
			hints.push(serieLength);
		}
		else if(hints.length == 0)
		{
			hints.push(0);
		}
		
		return hints;
	}
	
	areRowsValid(rows)
	{
		return this.are2DArraysEquals(rows, this.rows);
	}
	
	areColumnsValid(columns)
	{
		return this.are2DArraysEquals(columns, this.columns);
	}
	
	are2DArraysEquals(array1, array2)
	{
		let allEquals = true;
		
		for(let i = 0; i < array1.length; i++)
		{
			for(let j = 0; j < array1[i].length; j++)
			{
				allEquals &= (array1[i][j] == array2[i][j]);
			}
		}
		
		return allEquals;
	}
	
	static generate(width, height)
	{
		let picross = new Picross(width, height);

		let repetition = (width * height) * Math.max(0.25, Math.min(0.5, Math.random()));
		for(let i = 0; i < repetition; i++)
		{
			let x = Picross.randomInt(0, picross.getWidth());
			let y = Picross.randomInt(0, picross.getHeight());
			let state = true;
			picross.setCell(x, y, state);
		}
		
		return picross;
	}
	
	static randomInt(min, max)
	{
		return Math.floor(Math.random() * (max - min) + min);
	}
}

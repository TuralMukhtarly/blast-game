import {ArrayDescription} from "../interfaces/Interfaces";

class Engine {
    public rows: number;
    public columns: number;
    public cubeForSearch!: number;
    public findSimilarCubeArray!: Array<ArrayDescription>;

    public pointsCounter: number = 0;

    private gameArray!: any;

    constructor(obj) {
        const {rows, columns} = obj;
        this.rows = rows;
        this.columns = columns;
    }

    public createGameMatrix(): void {
        this.gameArray = [];
        for (let i = 0; i < this.rows; i++) {
            this.gameArray[i] = [];
            for (let j = 0; j < this.columns; j++) {
                let randomValue = Math.floor(Math.random() * 5);
                this.gameArray[i][j] = {
                    value: randomValue,
                    isEmpty: false,
                    row: i,
                    column: j
                }
            }
        }
    }

    public getValue(row: number, column: number): any {
        if (!this.checkCubeInField(row, column)) {
            return false;
        }
        return this.gameArray[row][column].value;
    }

    public getRadius(position: { x: number, y: number }, radius: number) {
        let x1 = Math.max(position.x - 1, 0);
        let x2 = Math.min(position.x + radius, this.columns - 1);

        let y1 = Math.max(position.y - 1, 0);
        let y2 = Math.min(position.y + 1, this.rows - 1);

        let cubes: Array<ArrayDescription> = [];

        for (let y = y1; y <= y2; y++) {
            for (let x = x1; x <= x2; x++) {
                cubes.push({row: x, column: y});
            }
        }
        return cubes;
    }

    public returnSimilarCube(row: number, column: number): Array<ArrayDescription> | undefined {
        if (!this.checkCubeInField(row, column) || this.gameArray[row][column].isEmpty) {
            return;
        }
        this.cubeForSearch = this.gameArray[row][column].value;
        this.findSimilarCubeArray = [];
        this.findSimilarCubeArray.length = 0;
        this.findSimilarCube(row, column);
        return this.findSimilarCubeArray;
    }

    public returnSimilarCubeCount(row: number, column: number): any {
        return this.returnSimilarCube(row, column)?.length;
    }

    public findSimilarCube(row: number, column: number) {
        if (!this.checkCubeInField(row, column) || this.gameArray[row][column].isEmpty) {
            return;
        }
        if (this.gameArray[row][column].value === this.cubeForSearch && !this.checkedCube(row, column)) {
            this.findSimilarCubeArray.push({
                row: row,
                column: column
            });
            this.pointsCounter = this.findSimilarCubeArray.length;
            this.findSimilarCube(row + 1, column);
            this.findSimilarCube(row - 1, column);
            this.findSimilarCube(row, column + 1);
            this.findSimilarCube(row, column - 1);
        }
    }

    public checkedCube(row: number, column: number) {
        let found = false;
        this.findSimilarCubeArray.forEach(function (item) {
            if (item.row === row && item.column === column) {
                found = true;
            }
        });
        return found;
    }

    public isEmpty(row: number, column: number): boolean {
        return this.gameArray[row][column].isEmpty;
    }

    public deleteSimilarCube(row: number, column: number): void {
        const array: any = this.returnSimilarCube(row, column);
        for (let i = 0; i < array.length; i++) {
            this.gameArray[array[i].row][array[i].column].isEmpty = true;
        }
    }

    public removeRadiusCubes(removeCubes: Array<ArrayDescription>) {
        for (let i = 0; i < removeCubes.length; i++) {
            this.gameArray[removeCubes[i].row][removeCubes[i].column].isEmpty = true;
        }
    }

    public dropCube(): Array<any> {
        const result: Array<any> = [];
        for (let i = this.rows - 2; i >= 0; i--) {
            for (let j = 0; j < this.columns; j++) {
                let emptySpaces = this.returnEmptyPlaceOnGameField(i, j);
                if (!this.isEmpty(i, j) && emptySpaces > 0) {
                    this.changeEmptyCube(i, j, i + emptySpaces, j);
                    result.push({
                        row: i + emptySpaces,
                        column: j,
                        deltaRow: emptySpaces
                    });
                }
            }
        }
        return result;
    }

    public changeEmptyCube(row: number, column: number, row2: number, column2: number): void {
        let tempObject = Object.assign(this.gameArray[row][column]);
        this.gameArray[row][column] = Object.assign(this.gameArray[row2][column2]);
        this.gameArray[row2][column2] = Object.assign(tempObject);
    }

    public addNewCubes(): Array<any> {
        const result: Array<any> = [];
        for (let i = 0; i < this.columns; i++) {
            if (this.isEmpty(0, i)) {
                let emptySpaces = this.returnEmptyPlaceOnGameField(0, i) + 1;
                for (let j = 0; j < emptySpaces; j++) {
                    let randomValue = Math.floor(Math.random() * 5);
                    result.push({
                        row: j,
                        column: i,
                        deltaRow: emptySpaces
                    });
                    this.gameArray[j][i].value = randomValue;
                    this.gameArray[j][i].isEmpty = false;
                }
            }
        }
        return result;
    }


    public returnEmptyPlaceOnGameField(row: number, column: number): number {
        let result = 0;
        if (row !== this.rows) {
            for (let i = row + 1; i < this.columns; i++) {
                if (this.isEmpty(i, column)) {
                    result++;
                }
            }
        }
        return result;
    }

    public checkCubeInField(row: number, column: number): boolean {
        return row >= 0 && row < this.rows && column >= 0 && column < this.columns && this.gameArray[row] !== undefined && this.gameArray[row][column] !== undefined;
    }

    public setImage(row: number, column: number, data): void {
        this.gameArray[row][column].data = data;
    }

    public getImage(row: number, column: number): { x: number, y: number } {
        return this.gameArray[row][column].data;
    }

}

export default Engine;

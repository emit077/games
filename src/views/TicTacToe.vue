<template>
  <div class="pt-10">
    <h1 class="text-h2 font-weight-bold font-italic text-center">Tic Tac Toe</h1>
  </div>
  <div class="my-8 text-center parent-div">
    <div v-for="row in rows" :key="row" class="text-center">
    <span v-for="col in rows" :key="col">
      <!--      {{ (row - 1) + "," + (col - 1) }}-->
      <input type="text" :class="gteClassName(row,col)" v-model="data[row-1][col-1]" readonly
             @click="inputValue(row,col)">
    </span>
    </div>
    <v-btn @click="restartGame" class="mt-8">Restart</v-btn>
  </div>
  <p v-if="result" class="text-h4 font-weight-bold text-center ">{{ result }}</p>
</template>
<!--  -->
<style lang="scss" scoped>
.parent-div {
  //transform: rotate(45deg);
}

input {
  width: 80px;
  height: 60px;
  margin: auto;
  //border-radius: 6px;
  font-size: 30px;
  text-align: center;
  cursor: pointer;
}

input:focus {
  outline: none;
}

.border-left {
  border-left: 1px solid gray;
}

.border-right {
  border-right: 1px solid gray;
}

.border-top {
  border-top: 1px solid gray;
}

.border-bottom {
  border-bottom: 1px solid gray;
}

.x-color {
  color: red;
}

.o-color {
  color: blue;
}
</style>
<!--   -->
<script>
export default {
  name: 'TicTacToe',
  data() {
    return {
      rows: 4,
      isWin: false,
      data: [],
      lastInput: "",
      result: "",
      inputCount: 0
    }
  },
  created() {
    this.restartGame()
  },
  methods: {
    inputValue(row, col) {
      if (!this.isWin) {
        this.lastInput = this.lastInput == 'o' ? 'x' : 'o'
        if (!this.data[row - 1][col - 1]) {
          this.data[row - 1][col - 1] = this.lastInput
          this.inputCount++
        }
        this.validateData()
      }
    },
    validateData() {
      // check all rows
      for (let i = 0; i < this.rows; i++) {
        let allEqual = this.data[i].every(v => v && v === this.data[i][0])
        if (allEqual) {
          this.isWin = true
          break;
        }
      }
      // check cols
      for (let i = 0; i < this.rows; i++) {
        let val = this.data[0][i] || null
        let matched = true
        for (let j = 0; j < this.rows; j++) {
          matched = val && matched && this.data[j][i] == val ? true : false
        }
        if (matched) {
          this.isWin = true
          break;
        }
      }

      // check diagonal 1
      let flag_1 = true
      for (let i = 0; i < this.rows; i++) {
        let val = this.data[0][0] || null
        flag_1 = val && flag_1 && this.data[i][i] == val ? true : false
      }
      if (flag_1)
        this.isWin = true

      // check diagonal 2
      let flag_2 = true
      for (let i = 0; i < this.rows; i++) {
        let val = this.data[0][this.rows-1] || null
        flag_2 = val && flag_2 && this.data[i][this.rows-1-i] == val ? true : false
      }
      if (flag_2)
        this.isWin = true


      // check game over
      this.result = this.isWin ? this.lastInput + " Win" : ''
      if (this.inputCount == this.rows * this.rows)
        this.result = "Game Draw"
    },
    restartGame() {
      this.isWin = false
      this.lastInput = ''
      this.inputCount = 0
      this.data = []
      for (let i = 0; i < this.rows; i++) {
        this.data.push([])
        for (let j = 0; j < this.rows; j++) {
          this.data[i].push('')
        }
      }
    },
    gteClassName(r, c) {
      let row = r - 1
      let col = c - 1
      let className = ""
      if (row == 0)
        className = className + ' border-bottom'
      else if (row > 0 && row < this.rows - 1)
        className = className + ' border-bottom border-top'
      else if (row == this.rows - 1)
        className = className + ' border-top'

      if (col == 0)
        className = className + ' border-right'
      else if (col > 0 && col < this.rows - 1)
        className = className + ' border-right border-left'
      else if (col == this.rows - 1)
        className = className + ' border-left'

      if (this.data[row][col])
        className = className + " " + this.data[row][col] + "-color"
      return className
    }
  }
};
</script>

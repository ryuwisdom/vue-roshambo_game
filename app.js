new Vue({
  // html에  <div id="app">로 뷰가 적용될 요소룰 선택
  el: '#app',
  data: {
    myChoice: null,
    comChoice: null,
    count: 3,
    winner: null,
    lifeOfMe: 3,
    lifeOfCom: 3,
    isSelectable: true,
    logs: [],
    selects: [
      { name: '가위', value: 'scissor' },
      { name: '바위', value: 'rock' },
      { name: '보', value: 'paper' },
    ],
  },
  computed: {
    myChoiceImg: function () {
      // vue instance 안에서는 this!
      return this.myChoice !== null
        ? `images/${this.myChoice}.jpg`
        : 'images/question.jpg';
    },
    comChoiceImg: function () {
      // vue instance 안에서는 this!
      return this.comChoice !== null
        ? `images/${this.comChoice}.jpg`
        : 'images/question.jpg';
    },
    leftLifeOfMe: function () {
      return 3 - this.lifeOfMe;
    },
    leftLifeOfCom: function () {
      return 3 - this.lifeOfCom;
    },
  },
  watch: {
    count: function (newVal) {
      if (newVal === 0) {
        //컴퓨터가 가위바위보를 선택하는
        this.selectCom();

        // 승패결정 & 녻차감
        this.whoIsWin();

        // 카운트가 3으로 리셋
        this.count = 3;
        this.isSelectable = true;

        //로그 업데이트 하는 부분
        this.updateLogs();
      }
    },
    lifeOfMe: function (newVal) {
      //게임종료
      if (newVal === 0) {
        this.endGame('+_+');
      }
    },
    lifeOfCom: function (newVal) {
      if (newVal === 0) {
        this.endGame('=_=');
      }
    },
  },
  methods: {
    startGame: function () {
      this.isSelectable = false;

      // 아래 this로 위 vue인스턴스를 가르킬 수 있고, this로 data내 myChoice값을 불러오고
      if (this.myChoice === null) {
        alert('가위 바위 보 중 하나를 선택해주세요.');
        this.isSelectable = true;
      } else {
        console.log('선택완료');
        // setInterval(function, micro seconds)
        // 지정한 시간마다 지정한 함수를 실행시켜

        // 여기서 콜백함수가 this의 위치를 변화시키기 떄문에
        // arrow function을 사용해야 한다

        let countDown = setInterval(() => {
          this.count--;
          if (this.count === 0) {
            clearInterval(countDown);
          }
        }, 1000);
      }

      // console.log('스타트 게임');
    },

    selectCom: function () {
      let number = Math.random();
      if (number < 0.33) {
        this.comChoice = 'scissor';
      } else if (number < 0.66) {
        this.comChoice = 'rock';
      } else {
        this.comChoice = 'paper';
      }
    },
    whoIsWin: function () {
      if (this.myChoice === this.comChoice) this.winner = 'no one';
      else if (this.myChoice === 'rock' && this.comChoice === 'scissor')
        this.winner = 'me';
      else if (this.myChoice === 'scissor' && this.comChoice === 'paper')
        this.winner = 'me';
      else if (this.myChoice === 'paper' && this.comChoice === 'rock')
        this.winner = 'me';
      else if (this.myChoice === 'scissor' && this.comChoice === 'rock')
        this.winner = 'com';
      else if (this.myChoice === 'paper' && this.comChoice === 'scissor')
        this.winner = 'com';
      else if (this.myChoice === 'rock' && this.comChoice === 'paper')
        this.winner = 'com';
      else this.winner = 'error';

      // 몫 차감
      if (this.winner === 'me') {
        this.lifeOfCom--;
      } else if (this.winner === 'com') {
        this.lifeOfMe--;
      }
    },
    updateLogs: function () {
      let log = {
        message: ` You : ${this.myChoice}, Computer: ${this.comChoice}`,
        winner: this.winner,
      };

      this.logs.unshift(log);
    },
  },
  endGame: function (msg) {
    setTimeout((msg) => {
      confirm(msg);
      (this.lifeOfMe = 3),
        (this.lifeOfCom = 3),
        (this.myChoice = null),
        (this.comChoice = null),
        (this.winner = null),
        (this.logs = []);
    }, 500);
  },
});

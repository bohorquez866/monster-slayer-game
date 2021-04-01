const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: []
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw!';
            } else if (value <= 0) {
                this.winner = 'lost';
            } else if (this.monsterHealth <= 0) {
                this.winner = 'won';
            }
        },
    },
    computed: {
        monsterHealthBar() {
            if (this.monsterHealth < 0) {
                return { width: '0%' };
            } else {
                return { width: `${this.monsterHealth}%` };
            }
        },
        playerHealthBar() {
            if (this.playerHealth < 0) {
                return { width: '0%' };
            } else {
                return { width: `${this.playerHealth}%` };
            }


        },
        specialAttackRound() {
            return this.currentRound % 3;

        }
    },
    methods: {
        restartGame() {
            this.playerHealth = 100,
                this.monsterHealth = 100,
                this.currentRound = 0,
                this.winner = null,
                this.logMessages = [];
        },
        getRandomValue(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },
        attackMonster() {
            const attackValue = this.getRandomValue(12, 5);
            this.monsterHealth -= attackValue;
            if (this.monsterHealth <= 0) {
                this.monsterHealth = 0
            }
            this.outputLog('Player', 'attack', attackValue)
            this.attackPlayer();
            this.currentRound++;
        },
        attackPlayer() {
            const attackValue = this.getRandomValue(12, 8);

            if (this.playerHealth <= 0) {
                this.playerHealth = 0
            } else {
                this.playerHealth -= attackValue;
            }
            this.outputLog('Monster', 'attack', attackValue);


        },
        specialAttackMonster() {
            const attackValue = this.getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.outputLog('Player', 'sp-attack', attackValue);

            this.currentRound++;
        },
        healPlayer() {
            const healValue = this.getRandomValue(8, 20);
            if (this.playerHealth + healValue >= 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.outputLog('Player', 'heal', healValue);
            this.attackPlayer();
            this.currentRound++;
        },
        surrender() {
            this.winner = 'surrender';
            this.playerHealth = 1;
        },
        outputLog(who, action, value) {
            this.logMessages.unshift({
                actionWho: who,
                actionAction: action,
                actionValue: value
            });
        }
    },

});
app.mount('#game')
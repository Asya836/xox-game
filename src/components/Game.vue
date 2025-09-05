<!-- Game.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const tics = ref({
  aA: '',
  aB: '',
  aC: '',
  bA: '',
  bB: '',
  bC: '',
  cA: '',
  cB: '',
  cC: '',
})

const player = ref('Bir')
const gameOver = ref('')

const handleReset = () => {
  tics.value = {
    aA: '',
    aB: '',
    aC: '',
    bA: '',
    bB: '',
    bC: '',
    cA: '',
    cB: '',
    cC: '',
  }
  player.value = 'Bir'
  gameOver.value = ''
}

const checkStatus = () => {
  const checkAllEmpties = Object.entries(tics.value).flatMap((entry) => entry[1]).filter(entry => entry === '')
  if (checkAllEmpties.length === 0) gameOver.value = "Beraber"
  if (tics.value.aA && tics.value.aA === tics.value.aB && tics.value.aA === tics.value.aC) gameOver.value = player.value
  if (tics.value.bA && tics.value.bA === tics.value.bB && tics.value.bA === tics.value.bC) gameOver.value = player.value
  if (tics.value.cA && tics.value.cA === tics.value.cB && tics.value.cA === tics.value.cC) gameOver.value = player.value
  if (tics.value.aA && tics.value.aA === tics.value.bA && tics.value.aA === tics.value.cA) gameOver.value = player.value
  if (tics.value.aB && tics.value.aB === tics.value.bB && tics.value.aB === tics.value.cB) gameOver.value = player.value
  if (tics.value.aC && tics.value.aC === tics.value.bC && tics.value.aC === tics.value.cC) gameOver.value = player.value
  if (tics.value.aA && tics.value.aA === tics.value.bB && tics.value.aA === tics.value.cC) gameOver.value = player.value
  if (tics.value.cA && tics.value.cA === tics.value.bB && tics.value.cA === tics.value.aC) gameOver.value = player.value
}

const handleClick = (key: 'aA' | 'aB' | 'aC' | 'bA' | 'bB' | 'bC' | 'cA' | 'cB' | 'cC') => {
  if (gameOver.value) return
  if (tics.value[key] !== '') return
  tics.value[key] = player.value
  checkStatus()
  if (gameOver.value) return
  player.value = player.value === 'Bir' ? "İki" : 'Bir'
}

const handleMessage = () => {
  if (gameOver.value === 'Beraber') return "Beraberlik!"
  if (gameOver.value === 'Bir' || gameOver.value === 'İki') return `Oyuncu ${gameOver.value} kazandı!`
  return `Sıra oyuncu ${player.value === 'Bir' ? 'X' : 'O'}'de`
}
</script>

<template>
  <div class="card">
    <div class="game-board">
      <h2>{{ handleMessage() }}</h2>
      <button v-if="gameOver !== ''" @click="handleReset()">Yeniden Başla</button>
      <div class="tile-container">
        <div v-for="(value, key) in tics" @click="handleClick(key)" class="tiles">
          {{ value === 'Bir' ? 'X' : value === 'İki' ? 'O' : '' }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-board {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tile-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 1rem;
  width: 100%;
  max-width: 400px;
  aspect-ratio: 1/1;
}

.tiles {
  background-color: #fff;
  color: #1a1a1a;
  border: 2px solid #1a1a1a;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(1.5rem, 10vw, 2rem);
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  aspect-ratio: 1/1;
}

.tiles:hover {
  background-color: #f0f0f0;
}

@media (max-width: 600px) {
  .game-board {
    padding: 0.5rem;
  }

  .tile-container {
    gap: 5px;
    padding: 0.5rem;
    max-width: 300px;
  }

  .tiles {
    font-size: clamp(1rem, 8vw, 1.5rem);
    border-width: 1px;
  }
}

@media (max-width: 400px) {
  .tile-container {
    max-width: 250px;
  }

  .tiles {
    font-size: clamp(0.8rem, 6vw, 1.2rem);
  }
}
</style>
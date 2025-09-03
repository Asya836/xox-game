<script setup lang="ts">
import { ref } from 'vue'

const tics=ref({
  aA:'',
  aB:'',
  aC:'',
  bA:'',
  bB:'',
  bC:'',
  cA:'',
  cB:'',
  cC:'',
})

const player=ref('Bir');
const gameOver=ref('');

const handleReset=()=>{
  tics.value={
  aA:'',
  aB:'',
  aC:'',
  bA:'',
  bB:'',
  bC:'',
  cA:'',
  cB:'',
  cC:'',
  };
  player.value='Bir';
  gameOver.value='';
}

const checkStatus=()=>{
  const checkAllEmpties=Object.entries(tics.value).flatMap((entry)=>entry[1]).filter(entry=>entry==='');
  if(checkAllEmpties.length===0) gameOver.value="Beraber";
  if(tics.value.aA && tics.value.aA===tics.value.aB && tics.value.aA===tics.value.aC) gameOver.value=player.value;
  if(tics.value.bA && tics.value.bA===tics.value.bB && tics.value.bA===tics.value.bC) gameOver.value=player.value;
  if(tics.value.cA && tics.value.cA===tics.value.cB && tics.value.cA===tics.value.cC) gameOver.value=player.value;
  if(tics.value.aA && tics.value.aA===tics.value.bA && tics.value.aA===tics.value.cA) gameOver.value=player.value;
  if(tics.value.aB && tics.value.aB===tics.value.bB && tics.value.aB===tics.value.cB) gameOver.value=player.value;
  if(tics.value.aC && tics.value.aC===tics.value.bC && tics.value.aC===tics.value.cC) gameOver.value=player.value;
  if(tics.value.aA && tics.value.aA===tics.value.bB && tics.value.aA===tics.value.cC) gameOver.value=player.value;
  if(tics.value.cA && tics.value.cA===tics.value.bB && tics.value.cA===tics.value.aC) gameOver.value=player.value;
}
const handleClick=(key:'aA'|'aB'|'aC'|'bA'|'bB'|'bC'|'cA'|'cB'|'cC')=>{
  if(gameOver.value) return
  if(tics.value[key]!=='') return
  tics.value[key]=player.value;
  checkStatus();
  if(gameOver.value) return
  player.value=player.value==='Bir'?"İki":'Bir';
}

const handleMessage=()=>{
  if(gameOver.value==='Beraber') return "Beraberlik!"
  if(gameOver.value==='Bir' || gameOver.value==='İki') return `Oyuncu ${player.value} kazandı!`
  return `Sıra oyuncu ${player.value==='Bir'?'X':'O'}'de`
}

</script>

<template>
  <h2>{{ handleMessage() }}</h2>
  <button v-if="gameOver!==''" @click="handleReset()">Yeniden Başla</button>

  <div class="tile-container">
    <div v-for="value ,key in tics" @click="handleClick(key)" class="tiles">
      {{ value==='Bir'? 'X':value==='İki'?'O':'' }}
    </div>
  </div>
</template>

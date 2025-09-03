<script setup lang="ts">
import { ref } from 'vue'

</script>

<template>
  <h1>XOX Oyununa Hoşgeldiniz!</h1>
  <button @click="$router.push('/game')">Oynamak için tıklayınız</button>
</template>
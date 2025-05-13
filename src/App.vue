<script setup>
</script>
<template>
  <header>
    
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
    <nav>
      <router-link to="/"><span>Home</span></router-link>
      <router-link to="/hogueras"><span>Hogueras</span></router-link>
      <router-link to="/participantes"><span>Participantes</span></router-link>
    </nav>
  </header>
  <main>
    <router-view />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}
nav {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.logo {
  transform: rotate(180deg)}

span {
  color: #ffa500;
}
</style>
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/launches">Launches</router-link>
      <router-link :to="{ name: 'NearEarthObjects' }"
        >Near Earth Objects</router-link
      >
    </div>
    <router-view />
  </div>
</template>

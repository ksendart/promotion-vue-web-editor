<template>
  <div class="main-layout">
    <b-navbar toggleable="md" type="dark" variant="info">

      <b-navbar-brand href="#"><router-link class="home-link" :to="{ name: 'home' }">Vue Web Editor</router-link>
      </b-navbar-brand>

    </b-navbar>
    <router-view></router-view>
    <notifications group="main" position="bottom left"></notifications>
  </div>
</template>
<script src="./home.ts" lang="ts"></script>
<style src="./home.scss" lang="scss"></style>
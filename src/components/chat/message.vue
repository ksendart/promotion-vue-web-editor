<template>
  <div class="message" v-bind:class="{ user: isUserAuthor }">
    <span v-if="!isUserAuthor" class="author">{{message.authorId}}</span>
    <div class="content" v-bind:class="{ user: isUserAuthor }">{{message.text}}</div>
  </div>
</template>
<script src="./message.ts" lang="ts"></script>
<style src="./message.scss" lang="scss"></style>
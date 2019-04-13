<template>
  <div style="width: 100%">
    <div v-for="item in messages">
      <message :message="item"></message>
    </div>
    <message-form v-on:sendMessage="sendMessage($event)"></message-form>
  </div>
</template>
<script src="./chat.ts" lang="ts"></script>
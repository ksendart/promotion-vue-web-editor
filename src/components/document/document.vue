<template>
  <div class="content">
    <!-- Modal Component -->
    <b-modal v-model="showModal" title="Confirm" @ok="rejectChanges()">
      <p class="my-4">Do you want to reject changes?</p>
    </b-modal>
    <b-col sm="8" class="document-view">
      <b-container>
        <h2>{{title}}</h2>
        <h4>Document #{{documentId}}</h4>
      </b-container>
      <b-container>
        <document-form v-if="documentId" :document="document" v-on:saveDocument="saveDocument($event)">
        </document-form>
      </b-container>
    </b-col>
    <b-col sm="4" class="chat-view">
      <chat></chat>
    </b-col>
  </div>
</template>
<script src="./document.ts" lang="ts"></script>
<style src="./document.scss" lang="scss"></style>
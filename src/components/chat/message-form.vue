<template>
  <b-form>
    <b-form-group id="textGroup"
                  label="Message Text"
                  label-for=text>
      <b-form-textarea id="text"
                       type="text"
                       v-model="message.text"
                       required
                       :rows="3"
                       placeholder="Enter text"
                       @keyup.17="sendMessage()">
      </b-form-textarea>
    </b-form-group>
    <b-button @click="sendMessage()" variant="primary">Submit</b-button>
  </b-form>
</template>
<script src="./message-form.ts" lang="ts"></script>
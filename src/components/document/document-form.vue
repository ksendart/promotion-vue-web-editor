<template>
  <div>
    <b-form v-if="document">
      <b-form-group id="titleGroup"
                    label="Document Title"
                    label-for=docTitle>
        <b-form-input id="docTitle"
                      type="text"
                      v-model="document.title"
                      v-on:input="submit()"
                      required
                      placeholder="Enter title">
        </b-form-input>
      </b-form-group>
      <b-form-group id="textGroup"
                    label="Document Text"
                    label-for=text>
        <vue-editor v-model="document.content"
                    v-on:input="submit()">
        </vue-editor>
      </b-form-group>
    </b-form>
  </div>
</template>
<script src="./document-form.ts" lang="ts"></script>
<!--style src="./document-form.scss"></style-->
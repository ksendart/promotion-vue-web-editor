<template>
  <div class="main-view">
    <b-col sm="6">
      <b-form>
        <p>{{text}}</p>
        <b-form-group id="loginGroup"
                      label="LOGIN"
                      label-for=login>
          <b-form-input id="login"
                        size="sm"
                        class="mr-sm-2"
                        type="text"
                        v-model="login"/>
        </b-form-group>

        <b-form-group id="passwordGroup"
                      label="PASSWORD"
                      label-for=password>
          <b-form-input id="password"
                        size="sm"
                        class="mr-sm-2"
                        type="text"
                        @keyup.enter.native="submit()"
                        v-model="password"/>
        </b-form-group>
        <b-button :disabled="!login && !password"
                  size="sm" class="my-2 my-sm-0"
                  @click="submit()">SUBMIT</b-button>
      </b-form>
    </b-col>
  </div>
</template>
<script src="./login.ts" lang="ts"></script>

<template>
  <div v-if="user" class="main-view">
    <!--login></login-->
    <p>Hello, {{ user.name }}
      <b-link @click="logOut()">LOG OUT</b-link>
    </p>

    <p>
      <b-button @click="openModal()">Change username</b-button>
    </p>

    <!-- Modal Component -->
    <b-modal v-model="showModal" title="Change Username" @ok="changeUsername()">
      <p class="my-4">Do you want to change your username?</p>
      <b-form-group id="titleGroup"
                    label="Username"
                    label-for=username>
        <b-form-input id="username"
                      type="text"
                      v-model="username"
                      required
                      placeholder="Enter new username">
        </b-form-input>
      </b-form-group>
    </b-modal>


    <router-link :to="{ name: 'create' }">Create Document</router-link>
    <ul v-if="documents.length">
      <li v-for="document of documents">
        <router-link :to="{ name: 'edit', params: { id: document.id } }">{{document.title}}</router-link>
      </li>
    </ul>
  </div>
</template>
<script src="./hello.ts" lang="ts"></script>
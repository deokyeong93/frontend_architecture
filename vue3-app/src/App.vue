<script setup lang="ts">
import { TO_DO_PLACEHOLDER } from '../../core/constant/index'


</script>

<template>
  <section class="container">
    <div class="todo-wrapper">
      <div class="todo-header">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
        <h2>To-do list</h2>
      </div>
      <div class="input">
        <input
          type="text"
          class="input-field"
          id="todoInput"
          :placeholder="TO_DO_PLACEHOLDER"
        />
        <button class="btn">Add</button>
      </div>
      <ul class="scroll">
        <li id="todoList"></li>
      </ul>
      <div>
        <hr class="counter" />
        <div class="counter-container">
          <p><span id="todoCount">0</span> items total</p>
          <button id="deleteButton">Delete All</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import '../../core/styles/app.css';

</style>
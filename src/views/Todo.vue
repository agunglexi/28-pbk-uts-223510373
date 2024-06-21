<template>
  <q-page padding>
    <q-form @submit.prevent="addTodo" class="todo-form">
      <q-input filled v-model="newTodo" label="New Todo" class="q-mb-md" />
      <q-btn round icon="add" color="primary" @click="addTodo" />
    </q-form>

    <div class="filter-buttons q-mt-md q-mb-md">
      <q-btn
        class="q-mr-sm"
        color="primary"
        @click="toggleFilter('done')"
        label="Checked"
      />
      <q-btn
        class="q-mr-sm"
        color="primary"
        @click="toggleFilter('undone')"
        label="Unchecked"
      />
      <q-btn color="primary" @click="clearFilter" label="Clear" />
    </div>

    <q-list bordered>
      <q-item
        v-for="todo in filteredTodos"
        :key="todo.id"
        v-bind:class="{ done: todo.done }"
      >
        <q-item-section avatar>
          <q-checkbox
            v-model="todo.done"
            @change="toggleTodoStatus(todo)"
            color="primary"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label
            v-if="!todo.editing"
            v-bind:class="{ done: todo.done }"
            @click="editTodo(todo)"
          >
            <span :class="{ scribble: todo.done }">{{ todo.title }}</span>
          </q-item-label>
          <q-input
            v-else
            v-model="todo.title"
            dense
            hide-underline
            autofocus
            @keyup.enter="finishEditing(todo)"
            @blur="finishEditing(todo)"
            :disable="todo.done"
          />
        </q-item-section>
        <q-item-section side>
          <q-btn
            v-if="!todo.editing && !todo.done"
            color="primary"
            icon="edit"
            flat
            dense
            round
            @click="editTodo(todo)"
          />
          <q-btn
            v-if="todo.editing || todo.done"
            color="primary"
            icon="check"
            flat
            dense
            round
            @click="finishEditing(todo)"
          />
          <q-btn
            color="primary"
            icon="delete"
            flat
            dense
            round
            @click="removeTodo(todo)"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";
import { useTodoStore } from "../stores/todoStore";

const newTodo = ref("");
const filter = ref(null);

const store = useTodoStore();

const addTodo = () => {
  if (newTodo.value.trim()) {
    store.addTodo({
      id: Date.now(),
      title: newTodo.value,
      done: false,
      editing: false,
    });
    newTodo.value = "";
  }
};

const removeTodo = (todo) => {
  store.removeTodo(todo);
};

const editTodo = (todo) => {
  todo.editing = true;
};

const finishEditing = (todo) => {
  if (todo.title.trim()) {
    todo.editing = false;
  } else {
    store.removeTodo(todo);
  }
};

const toggleTodoStatus = (todo) => {
  store.toggleTodoStatus(todo);
};

const toggleFilter = (type) => {
  if (filter.value === type) {
    filter.value = null;
  } else {
    filter.value = type;
  }
};

const clearFilter = () => {
  filter.value = null;
};

const filteredTodos = computed(() => store.filteredTodos(filter.value));
</script>

<style scoped>
.todo-container {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.todo-form {
  margin-bottom: 20px;
}
.filter-buttons {
  display: flex;
  justify-content: flex-end;
}
.done {
  color: #6c757d;
}
.scribble {
  position: relative;
}
.scribble::after {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  height: 2px;
  background: #6c757d;
  transform: rotate(-5deg);
}
</style>

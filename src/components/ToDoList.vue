<template>
  <div class="container-fluid" style="width: 40em">
    <div class="card m-3">
      <div class="card-header">
        <form @submit.prevent="addTodo">
          <div class=col-12>
            <div class="row">
              <div class="col-3">
                <label for="newTodo" class="form-label">New Todo</label>
              </div>
              <div class="col-7">
                <input v-model="newTodo" type="text" class="form-control form-control-sm" name="newTodo" id="newTodo">
              </div>
              <div class="col-2">
                <button class="btn btn-primary btn-sm float-end" type="submit" name="button">
                  <i class="bi bi-plus"></i>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="card-body">
        <div class="float-end">
          <button class="btn btn-success btn-sm me-1" @click="allDone" type="button" name="button">
            <i class="bi bi-check-all"></i>
          </button>
          <button class="btn btn-danger btn-sm me-1" @click="allRemove" type="button" name="button">
            <i class="bi bi-trash-fill"></i>
          </button>
          <!-- New Buttons for Filter -->
          <button class="btn btn-primary btn-sm me-1" @click="toggleFilter('done')" type="button" name="button">
            Checked
          </button>
          <button class="btn btn-primary btn-sm me-1" @click="toggleFilter('undone')" type="button" name="button">
            Unchecked
          </button>
          <button class="btn btn-primary btn-sm" @click="clearFilter" type="button" name="button">
            Clear
          </button>
        </div>
      </div>
      <ul class="list-group list-group-flush list-group-numbered">
        <li class="list-group-item" v-for="todo in filteredTodos" :key="todo">
          <input class="form-check-input" type="checkbox" v-model="todo.done" id="flexCheckDefault">
          <label class="form-check-label ms-3" for="flexCheckDefault" :class="{ done: todo.done }">
            {{todo.title}}
          </label>
          <button @click="removeTodo(todo)" class="btn btn-danger btn-sm float-end" type="button" name="button">
            <i class="bi bi-trash-fill"></i>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToDoList',

  data: () => ({
    newTodo: '',
    todos: [],
    filter: null
  }),

  methods: {
    addTodo() {
      this.todos.push({
        title: this.newTodo,
        done: false
      });
      this.newTodo = '';
    },
    removeTodo(todo) {
      const todoIndex = this.todos.indexOf(todo);
      this.todos.splice(todoIndex, 1);
    },
    allDone() {
      this.todos.forEach(todo => {
        todo.done = true;
      });
    },
    allRemove() {
      this.todos = [];
    },
    toggleFilter(type) {
      if (this.filter === type) {
        this.filter = null;
      } else {
        this.filter = type;
      }
    },
    clearFilter() {
      this.filter = null;
    }
  },
  computed: {
    filteredTodos() {
      if (this.filter === 'done') {
        return this.todos.filter(todo => todo.done);
      } else if (this.filter === 'undone') {
        return this.todos.filter(todo => !todo.done);
      } else {
        return this.todos;
      }
    }
  }
}
</script>

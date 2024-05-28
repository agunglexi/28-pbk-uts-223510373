<template>
  <div class="container-fluid" :style="{ width: containerWidth }">
    <div class="card m-3">
      <div class="card-header">
        <ul class="nav nav-tabs">
          <li class="nav-item" @click="selectedMenu = 'Todos'" :class="{ 'active': selectedMenu === 'Todos' }">
            <a class="nav-link" href="#">Todos</a>
          </li>
          <li class="nav-item" @click="selectedMenu = 'Post'" :class="{ 'active': selectedMenu === 'Post' }">
            <a class="nav-link" href="#">Post</a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <div v-if="selectedMenu === 'Todos'">
          <slot name="todo-header">
            <form @submit.prevent="addTodo">
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
            </form>
          </slot>

          <!-- Filter Buttons -->
          <div class="float-end mt-3">
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

          <!-- Todo List -->
          <ul class="list-group list-group-flush list-group-numbered">
            <li class="list-group-item" v-for="todo in filteredTodos" :key="todo.title">
              <input class="form-check-input" type="checkbox" v-model="todo.done" id="flexCheckDefault">
              <label class="form-check-label ms-3" for="flexCheckDefault" :class="{ done: todo.done }">
                {{ todo.title }}
              </label>
              <button @click="removeTodo(todo)" class="btn btn-danger btn-sm float-end" type="button" name="button">
                <i class="bi bi-trash-fill"></i>
              </button>
            </li>
          </ul>
        </div>

        <div v-if="selectedMenu === 'Post'">
          <slot name="post-header">
            <label for="userSelect">Select User:</label>
            <select id="userSelect" v-model="selectedUser">
              <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
            </select>
          </slot>

          <ul v-if="selectedUser">
            <li v-for="post in userPosts" :key="post.id">
              {{ post.title }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToDoList',

  props: {
    containerWidth: {
      type: String,
      default: '40em'
    }
  },

  data: () => ({
    newTodo: '',
    todos: [],
    filter: null,
    selectedMenu: 'Todos', // Default menu selection
    users: [], // Placeholder for users data
    selectedUser: null, // Selected user ID for posts
    userPosts: [] // Placeholder for user posts data
  }),

  methods: {
    addTodo() {
      if (this.newTodo.trim()) {
        this.todos.push({
          title: this.newTodo,
          done: false
        });
        this.newTodo = '';
      }
    },
    removeTodo(todo) {
      const todoIndex = this.todos.indexOf(todo);
      if (todoIndex !== -1) {
        this.todos.splice(todoIndex, 1);
      }
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
    },
    fetchUsers() {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => this.users = data)
        .catch(error => console.error('Error fetching users:', error));
    },
    fetchUserPosts(userId) {
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(response => response.json())
        .then(data => this.userPosts = data)
        .catch(error => console.error(`Error fetching posts for user ${userId}:`, error));
    }
  },
  watch: {
    selectedUser(newVal) {
      if (newVal) {
        this.fetchUserPosts(newVal);
      }
    }
  },
  created() {
    this.fetchUsers();
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

<style scoped>
.done {
  text-decoration: line-through;
}
</style>

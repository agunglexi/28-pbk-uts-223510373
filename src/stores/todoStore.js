import { defineStore } from "pinia";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: JSON.parse(localStorage.getItem("todos")) || [],
  }),
  actions: {
    addTodo(todo) {
      this.todos.push(todo);
      this.saveToLocalStorage();
    },
    removeTodo(todo) {
      const index = this.todos.indexOf(todo);
      if (index !== -1) {
        this.todos.splice(index, 1);
        this.saveToLocalStorage();
      }
    },
    toggleTodoStatus(todo) {
      const index = this.todos.indexOf(todo);
      if (index !== -1) {
        this.todos[index].done = !this.todos[index].done;
        this.saveToLocalStorage();
      }
    },
    saveToLocalStorage() {
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    clearTodos() {
      this.todos = [];
      this.saveToLocalStorage();
    },
  },
  getters: {
    filteredTodos: (state) => (filter) => {
      if (filter === "done") {
        return state.todos.filter((todo) => todo.done);
      } else if (filter === "undone") {
        return state.todos.filter((todo) => !todo.done);
      } else {
        return state.todos;
      }
    },
  },
});

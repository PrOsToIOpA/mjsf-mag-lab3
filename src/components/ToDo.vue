<template>
  <div class="todo">
    <div class="card text-left">
      <div class="card-header">
        ToDo Component
      </div>
      <!-- Button trigger modal -->
      <button type="button" class="w-25 m-2 btn btn-primary" @click="addTodo">
        Create a new todo
      </button>

      <!-- Modal -->
      <div class="card-body">
        <h5 class="card-title">My tasks</h5>
        <ul class="pt-3">
          <li v-for="(item, index) in filteredTaskList" :key="index" class="d-flex justify-content-between mb-3">
            <div>
              <h4 v-if="item.isCompletedTask">
                <s>{{item.title}}</s>
              </h4>
              <h4 v-else>{{ item.title }}</h4>
              <p>{{ item.description }}</p>
              <p>{{ item.type }}</p>
            </div>
           <div>
             <button
                 class="btn mr-2"
                 :class="`btn-${item.typeClass}`"
                 @click="toggleTodoItemStatus(item)"
             >
               {{ item.statusText }}
             </button>
             <button class="btn btn-danger mr-2" @click="removeItem(item)">Delete</button>
             <button class="btn btn-primary" @click="editItem(item)">Edit</button>
           </div>
          </li>
        </ul>
        <div class="card-footer">
          <button
              class="btn"
              :class="{'btn-primary': isEmptyFilterStatus}"
              @click="changeFilterStatus('')"
          >
            All
          </button>
          <button
              class="btn"
              :class="{'btn-primary': isCompletedFilterStatus}"
              @click="changeFilterStatus(taskStatus.COMPLETED)"
          >
            Completed
          </button>
          <button
              class="btn"
              :class="{'btn-primary': isUnCompletedFilterStatus}"
              @click="changeFilterStatus(taskStatus.UNCOMPLETED)"
          >
            Un Completed
          </button>
          <span>
            Active tasks count: {{ tasksCount }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TASK_STATUS, TASK_TYPE } from '@/models/task';
import Modal from './Modal';
import {MODAL_TYPE, MODAL_NAME} from "@/components/Modal";

export default {
  name: "ToDo",
  props: {},
  data: () => {
    return {
      taskList: [],
      filterStatus: "",
      loading: false,
      taskStatus: TASK_STATUS,
    }
  },
  async mounted() {
    this.loading = true;
    await this.refreshData()
    this.loading = false;
  },
  methods: {
   async refreshData() {
      this.taskList = await this.$services.todo.fetch();
    },
    showModal(componentProps) {
      this.$modal.show(Modal, componentProps, {
        name: MODAL_NAME,
      })
    },
    hideModal() {
      this.$modal.hide(MODAL_NAME);
    },
    addTodo() {
      this.showModal({
        onSubmit: this.saveTodo,
        type: MODAL_TYPE.ADD
      });
    },
    editItem(item) {
      this.showModal({
        onSubmit: this.updateTodo,
        type: MODAL_TYPE.EDIT,
        item
      });
    },
    async saveTodo(model) {
      await this.$services.todo.save(model);
      this.hideModal();
      await this.refreshData();
    },
    async updateTodo(item) {
      await this.$services.todo.update(item.id, item);
      this.hideModal();
      await this.refreshData()
    },
    async removeItem(item) {
      await this.$services.todo.delete(item.id);
      await this.refreshData()
    },
    toggleTodoItemStatus(item) {
      item.status = item.status === this.taskStatus.COMPLETED
          ? this.taskStatus.UNCOMPLETED
          : this.taskStatus.COMPLETED
    },
    changeFilterStatus(status) {
      this.filterStatus = status;
    },
    mapFilteredTaskList(item) {
      item.typeClass = 'primary';
      if (item.type === TASK_TYPE.IMMEDIATELY) {
        item.typeClass = 'danger';
      }
      if (item.type === TASK_TYPE.IMPORTANT) {
        item.typeClass = 'pink';
      }
      if (item.type === TASK_TYPE.ORDINARY) {
        item.typeClass = 'success';
      }
      if (item.status === this.taskStatus.COMPLETED) {
        item.statusText = 'Completed';
      } else {
        item.statusText = 'Un completed';
      }
      item.isCompletedTask = item.status === this.taskStatus.COMPLETED;
      return item;
    },
  },
  computed: {
    isEmptyFilterStatus() {
      return !this.filterStatus;
    },
    isCompletedFilterStatus() {
      return this.filterStatus === this.taskStatus.COMPLETED
    },
    isUnCompletedFilterStatus() {
      return this.filterStatus === this.taskStatus.UNCOMPLETED
    },
    tasksCount() {
      return this.taskList.length
    },
    filteredTaskList() {
      return this.taskList
          .filter((item) => {
            if (this.isEmptyFilterStatus) return true;
            return item.status === this.filterStatus;
          })
          .map(this.mapFilteredTaskList);
    }
  }
}
</script>

<style scoped>
.todo {
  background-color: aqua;
}

.btn-pink {
  background: #FFC0CB;
}
</style>

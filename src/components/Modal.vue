<template>
    <div>
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ modalTitle }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          </button>
        </div>
        <div class="modal-body card-text">
          <div>
            <div class="form-group">
              <label for="task-title">Task title</label>
              <input
                  v-model="model.title"
                  type="text"
                  class="form-control"
                  id="task-title"
                  aria-describedby="emailHelp"
              >
            </div>
            <div class="form-group">
              <label for="task-desc">Task description</label>
              <textarea v-model="model.description" class="form-control" id="task-desc" />
            </div>
            <div class="form-group">
              <label for="task-desc">Task type</label>
              <select v-model="model.type" class="form-control" id="task-type">
                <option v-for="(taskTypeOption, idx) of taskTypeOptions" :value="taskTypeOption.value" :key="idx">
                  {{ taskTypeOption.label }}
                </option>
              </select>
            </div>
            <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
                @click="submit"
                :disabled="!isValid"
            >
              Submit
            </button>
            <button type="button" class="ml-2 btn btn-secondary" @click="$emit('close');">Cancel</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {Task, TASK_TYPE} from "@/models/task";

export const MODAL_TYPE = Object.freeze({
  ADD: 'add',
  EDIT: 'edit',
});

export const MODAL_NAME = "modal";

export default {
  name: 'Modal',
  props: {
    onSubmit: {
      type: Function,
      required: true,
    },
    type: {
      type: String,
      default: MODAL_TYPE.ADD
    },
    item: {
      type: Object,
      default: () => ({})
    }
  },
  created() {
    if (this.type === MODAL_TYPE.EDIT) {
      this.model = {...this.item}
    }
  },
  data() {
    return {
      model: new Task(),
      taskTypeOptions: [
        {
          label: "Immediately",
          value: TASK_TYPE.IMMEDIATELY,
        },
        {
          label: "Important",
          value: TASK_TYPE.IMPORTANT,
        },
        {
          label: "Ordinary",
          value: TASK_TYPE.ORDINARY,
        },
        {
          label: "Insignificant",
          value: TASK_TYPE.INSIGNIFICANT,
        }
      ],
    };
  },
  methods: {
    submit() {
      this.onSubmit(this.model)
    }
  },
  computed: {
    isValid() {
      return this.model.title && this.model.description;
    },
    modalTitle() {
      return this.type === MODAL_TYPE.ADD ? "Add a new todo item" : "Edit a todo item";
    }
  }
}
</script>
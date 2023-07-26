<template>
  <teleport to="body">
    <div class="confirm-modal" v-if="show">
      <div class="confirm-modal-content">
        <div class="confirm-modal-header">
          <h3>{{ title }}</h3>
        </div>
        <div class="confirm-modal-body">
          <p>{{ message }}</p>
        </div>
        <div class="confirm-modal-footer">
          <button data-test="confirm-btn" class="btn btn-success" @click="confirmClick">Bestätigen</button>
          <button data-test="cancel-btn" class="btn btn-danger" @click="cancelClick">Abbrechen</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  name: "ConfirmModal",
  components: {},
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  emits: ['confirm', 'cancel'],
  data() {
    return {
      modalVisible: false,
    };
  },
  methods: {
    confirmClick() {
      this.$emit("confirm", true);
    },
    cancelClick() {
      this.$emit("cancel", false);
    },
  },
};

</script>
<style scoped lang="scss">

</style>


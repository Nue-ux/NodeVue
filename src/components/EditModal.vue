<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  visible: Boolean,
  item: Object
})

const emits = defineEmits(['close', 'updated'])

const form = ref({})

watch(
    () => props.item,
    (newItem) => {
      form.value = { ...newItem }
    },
    { immediate: true }
)

const closeModal = () => {
  emits('close')
}

const saveChanges = async () => {
  try {
    const { _id, ...data } = form.value
    const res = await fetch(`http://localhost:3000/hogueras/edit/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
  },
    body: JSON.stringify(data)
  })
    if (!res.ok) throw new Error('Error al actualizar')
    emits('updated', form.value)
    closeModal()
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal">
      <h2>Editar ítem</h2>
      <form @submit.prevent="saveChanges">
        <div class="form-group">
          <label>ID</label>
          <input type="text" v-model="form._id" disabled />
        </div>
        <div class="form-group">
          <label>Participante</label>
          <input type="text" v-model="form.participante" />
        </div>
        <div class="form-group">
          <label>Pareja presente</label>
          <input type="text" v-model="form.pareja_presente" />
        </div>
        <div class="form-group">
          <label>Tentación presente</label>
          <input type="text" v-model="form.tentacion_presente" />
        </div>
        <div class="form-group">
          <label>Reacción</label>
          <input type="text" v-model="form.reaccion" />
        </div>
        <div class="form-group">
          <label>Decisión</label>
          <input type="text" v-model="form.decision" />
        </div>
        <div class="buttons">
          <button type="button" @click="closeModal">Cancelar</button>
          <button type="submit">Guardar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(249, 249, 249, 0.24);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  background: #000000;
  padding: 1rem;
  border-radius: 5px;
  width: 300px;
}
.form-group {
  margin-bottom: 0.8rem;
}
.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
</style>
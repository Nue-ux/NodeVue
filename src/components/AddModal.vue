// MongoApi/src/components/AddModal.vue
<script setup>
import { ref } from 'vue'

const props = defineProps({
  visible: Boolean
})
const emits = defineEmits(['close', 'added'])

const form = ref({
  participante: '',
  pareja_presente: '',
  tentacion_presente: '',
  reaccion: '',
  decision: ''
})

const closeModal = () => {
  emits('close')
}

const addItem = async () => {
  try {
    const res = await fetch(`http://localhost:3000/hogueras/insert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    })
    if (!res.ok) throw new Error('Error al agregar ítem')
    const result = await res.json()
    // Generar un objeto completo combinando los datos del formulario y el _id insertado
    const completeItem = { ...form.value, _id: result.insertedId }
    emits('added', completeItem)
    closeModal()
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal">
      <h2>Agregar nuevo ítem</h2>
      <form @submit.prevent="addItem">
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
          <button type="submit">Agregar</button>
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
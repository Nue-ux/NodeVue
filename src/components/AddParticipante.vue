<script setup>
import { ref } from 'vue'

const props = defineProps({
  visible: Boolean
})
const emits = defineEmits(['close', 'added'])

const form = ref({
  nombre: '',
  edad: '',
  ciudad: '',
  estado_actual: '',
  pareja: '',
  tentaciones: [],
  infidelidades: ''
})

const closeModal = () => {
  emits('close')
}

const addItem = async () => {
  try {
    const res = await fetch(`http://localhost:3000/participantes/insert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form.value)
    })
    if (!res.ok) throw new Error('Error al agregar participante')
    const result = await res.json()
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
      <h2>Agregar nuevo participante</h2>
      <form @submit.prevent="addItem">
        <div class="form-group">
          <label>Nombre</label>
          <input type="text" v-model="form.nombre" />
        </div>
        <div class="form-group">
          <label>Edad</label>
          <input type="number" v-model="form.edad" />
        </div>
        <div class="form-group">
          <label>Ciudad</label>
          <input type="text" v-model="form.ciudad" />
        </div>
        <div class="form-group">
          <label>Estado actual</label>
          <input type="text" v-model="form.estado_actual" />
        </div>
        <div class="form-group">
          <label>Pareja</label>
          <input type="text" v-model="form.pareja" />
        </div>
        <!-- Puedes agregar una interfaz para gestionar el arreglo de tentaciones -->
        <div class="form-group">
          <label>Infidelidades</label>
          <input type="number" v-model="form.infidelidades" />
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  background: #fff;
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
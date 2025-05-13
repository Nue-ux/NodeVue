<script setup lang="js">
import { ref, watch } from 'vue'

const props = defineProps({
  visible: Boolean,
  item: { type: Object, default: null }
})
const emits = defineEmits(['close', 'added'])

const defaultForm = {
  nombre: '',
  edad: '',
  ciudad: '',
  estado_actual: '',
  pareja: '',
  tentaciones: [],
  infidelidades: 0
}

const form = ref({ ...defaultForm })

watch(
    () => props.item,
    (newItem) => {
      if (newItem) {
        form.value = { ...newItem, tentaciones: newItem.tentaciones || [] }
      } else {
        form.value = { ...defaultForm }
      }
    },
    { immediate: true }
)

const closeModal = () => {
  emits('close')
}

const addTentacion = () => {
  form.value.tentaciones.push({ nombre: '', edad: '', compatibilidad: '' })
}

const removeTentacion = (index) => {
  form.value.tentaciones.splice(index, 1)
}

const saveItem = async () => {
  try {
    // if (form.value._id) {
    //   const res = await fetch(`http://localhost:3000/participantes/edit/${form.value._id}`, {
    //     method: 'PUT',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify(form.value)
    //   })
    //   if (!res.ok) throw new Error('Error al actualizar participante')
    //   await res.json()
    // } else {
      console.log('Adding new participant:', form.value);
      const res = await fetch(`http://localhost:3000/participantes/insert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form.value)
      })
      if (!res.ok) throw new Error('Error al agregar participante')

      const result = await res.json()
      console.log('Response del insert:', result)  // Depuración

      // Asegurar que se asigna el _id
      form.value._id = result.insertedId || result._id || form.value._id
    //}
    emits('added', { ...form.value })
    closeModal()
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal">
      <h2>{{ form._id ? 'Editar Participante' : 'Agregar nuevo participante' }}</h2>
      <form @submit.prevent="saveItem">
        <div class="form-group">
          <label>Nombre</label>
          <input type="text" v-model="form.nombre" required />
        </div>
        <div class="form-group">
          <label>Edad</label>
          <input type="number" v-model="form.edad" required />
        </div>
        <div class="form-group">
          <label>Ciudad</label>
          <input type="text" v-model="form.ciudad" required />
        </div>
        <div class="form-group">
          <label>Estado actual</label>
          <input type="text" v-model="form.estado_actual" required />
        </div>
        <div class="form-group">
          <label>Pareja</label>
          <input type="text" v-model="form.pareja" />
        </div>
        <div class="form-group">
          <label>Infidelidades</label>
          <input type="number" v-model="form.infidelidades" />
        </div>
        <div class="form-group">
          <label>Tentaciones:</label>
          <div v-for="(tent, index) in form.tentaciones" :key="index" class="tentacion-group">
            <input type="text" v-model="tent.nombre" placeholder="Nombre de la tentación" required />
            <input type="number" v-model="tent.edad" placeholder="Edad" required />
            <input type="number" v-model="tent.compatibilidad" placeholder="Compatibilidad" required />
            <button type="button" @click="removeTentacion(index)">Eliminar</button>
          </div>
          <button type="button" @click="addTentacion">Agregar tentación</button>
        </div>
        <div class="buttons">
          <button type="button" @click="closeModal">Cancelar</button>
          <button type="submit">{{ form._id ? 'Actualizar' : 'Agregar' }}</button>
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
.tentacion-group {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-bottom: 0.5rem;
  border: 1px solid #333;
  padding: 0.5rem;
}
.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
</style>
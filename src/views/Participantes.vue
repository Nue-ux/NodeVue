<template>
  <div>
    <h1>Participantes</h1>
    <div v-if="error">Error: {{ error }}</div>
    <div v-else class="scroll-container">
      <ul class="grid-container">
        <li
          v-for="item in participantes"
          :key="item._id"
          class="grid-item"
          @click="openModal(item)"
        >
          <button class="delete-btn" @click="deleteItem(item, $event)">X</button>
          <p><strong>ID:</strong> {{ item._id }}</p>
          <p><strong>Nombre:</strong> {{ item.nombre }}</p>
          <p><strong>Edad:</strong> {{ item.edad }}</p>
          <p><strong>Ciudad:</strong> {{ item.ciudad }}</p>
          <p><strong>Estado:</strong> {{ item.estado_actual }}</p>
          <p>
            <strong>Pareja:</strong>
            {{ item.pareja ? item.pareja : 'Sin pareja' }}
          </p>
          <p>
            <strong>Tentaciones:</strong>
            <span v-if="item.tentaciones && item.tentaciones.length">
              <span v-for="(t,index) in item.tentaciones" :key="index">
                {{ t.nombre }} ({{ t.edad }} años, compatibilidad {{ t.compatibilidad }})
                <span v-if="index < item.tentaciones.length - 1">, </span>
              </span>
            </span>
            <span v-else>Ninguna</span>
          </p>
          <p><strong>Infidelidades:</strong> {{ item.infidelidades }}</p>
        </li>
      </ul>
    </div>
    <button class="add-btn" @click="openAddModal">
      Agregar nuevo participante
    </button>
    <EditModal
      :visible="modalVisible"
      :item="selectedItem"
      @close="closeModal"
      @updated="updateItem"
    />
    <AddModal
      :visible="addModalVisible"
      @close="closeAddModal"
      @added="addItemToList"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import EditModal from '../components/EditModal.vue'
import AddModal from '../components/AddModal.vue'

const participantes = ref([])
const error = ref('')
const modalVisible = ref(false)
const selectedItem = ref(null)
const addModalVisible = ref(false)

const fetchParticipantes = async () => {
  try {
    const res = await fetch('http://localhost:3000/participantes')
    if (!res.ok) throw new Error('Error en la petición')
    participantes.value = await res.json()
  } catch (err) {
    error.value = err.message
  }
}

const openModal = (item) => {
  selectedItem.value = item
  modalVisible.value = true
}

const closeModal = () => {
  modalVisible.value = false
}

const updateItem = (updated) => {
  const index = participantes.value.findIndex(i => i._id === updated._id)
  if (index !== -1) {
    participantes.value[index] = updated
  }
}

const deleteItem = async (item, event) => {
  event.stopPropagation()
  try {
    const res = await fetch(`http://localhost:3000/participantes/delete/${item._id}`, {
      method: 'DELETE'
    })
    if (!res.ok) throw new Error('Error al eliminar')
    participantes.value = participantes.value.filter(i => i._id !== item._id)
  } catch (err) {
    console.error(err)
  }
}

const openAddModal = () => {
  addModalVisible.value = true
}

const closeAddModal = () => {
  addModalVisible.value = false
}

const addItemToList = (newItem) => {
  participantes.value.push(newItem)
}

onMounted(() => {
  fetchParticipantes()
})
</script>

<style scoped>
h1 {
  text-align: center;
  margin-bottom: 1rem;
}

.scroll-container {
  overflow-y: auto;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 0;
  list-style: none;
}
.grid-item {
  background: rgba(249, 249, 249, 0.24);
  padding: 1rem;
  border-radius: 5px;
  height: auto;
  min-height: 250px;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
}
p {
  margin: 0.2rem 0;
}
.delete-btn {
  position: absolute;
  top: 0.2rem;
  right: 0.2rem;
  background: transparent;
  border: none;
  font-size: 1rem;
  cursor: pointer;
}
.add-btn {
  display: block;
  margin: 1rem auto;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}
</style>


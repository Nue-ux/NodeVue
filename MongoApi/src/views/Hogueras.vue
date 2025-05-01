// MongoApi/src/views/Hogueras.vue
<script setup>
import { ref, onMounted } from 'vue'
import EditModal from '../components/EditModal.vue'
import AddModal from '../components/AddModal.vue'

const hogueras = ref([])
const error = ref('')
const modalVisible = ref(false)
const selectedItem = ref(null)
const addModalVisible = ref(false)

const fetchHogueras = async () => {
  try {
    const res = await fetch('http://localhost:3000/hogueras')
    if (!res.ok) throw new Error('Error en la petición')
    hogueras.value = await res.json()
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
  const index = hogueras.value.findIndex(i => i._id === updated._id)
  if (index !== -1) {
    hogueras.value[index] = updated
  }
}

const deleteItem = async (item, event) => {
  event.stopPropagation()
  try {
    const res = await fetch(`http://localhost:3000/hogueras/delete/${item._id}`, {
      method: 'DELETE'
    })
    if (!res.ok) throw new Error('Error al eliminar')
    hogueras.value = hogueras.value.filter(i => i._id !== item._id)
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
  hogueras.value.push(newItem)
}

onMounted(() => {
  fetchHogueras()
})
</script>

<template>
  <div>
    <h1>Hogueras</h1>
    <div v-if="error">Error: {{ error }}</div>
    <div v-else class="scroll-container">
      <ul class="grid-container">
        <li v-for="item in hogueras" :key="item._id" class="grid-item" @click="openModal(item)">
          <button class="delete-btn" @click="deleteItem(item, $event)">X</button>
          <p>ID: {{ item._id }}</p>
          <p>Participante: {{ item.participante }}</p>
          <p>Pareja presente: {{ item.pareja_presente ? item.pareja_presente : 'Ninguna' }}</p>
          <p>Tentación presente: {{ item.tentacion_presente }}</p>
          <p>Reacción: {{ item.reaccion }}</p>
          <p>Decisión: {{ item.decision }}</p>
        </li>
      </ul>
    </div>
    <button class="add-btn" @click="openAddModal">Agregar nuevo ítem</button>
    <EditModal :visible="modalVisible" :item="selectedItem" @close="closeModal" @updated="updateItem" />
    <AddModal :visible="addModalVisible" @close="closeAddModal" @added="addItemToList" />
  </div>
</template>

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
  height: 250px;
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
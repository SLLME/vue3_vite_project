<template>
  <div>
    <slotB>
      <div style="color: red;">这是第三行</div>
      <componentA></componentA>
    </slotB>
    <hr />
    <slotC>
      这是
      <template v-slot:header>
        这是header-slot文本
      </template>
      <template v-slot:footer>
        这是footer-slot文本
      </template>
      default-slot文本
    </slotC>
    <hr />
    <slotC>
      这是
      <template #header>
        这是header-slot文本
      </template>
      <template #footer>
        这是footer-slot文本
      </template>
      default-slot文本
    </slotC>
    <hr />
    <slotD v-slot="slotProps">
      {{ slotProps.person }}
    </slotD>
    <hr />
    <slotD>
      <template #default="slotProps">
        {{ slotProps.person }}
        {{ slotProps.namea }}
      </template>
    </slotD>
    <hr />
    <slotD v-slot="{ person, namea }">
      {{ person }} {{ namea }}
    </slotD>
  </div>
</template>

<script setup lang="ts" name="SlotA">
import slotB from './slotB.vue';
import slotC from './slotC.vue'
import slotD from './slotD.vue';
import componentA from './components/componentA.vue';
</script>

<style scoped></style>
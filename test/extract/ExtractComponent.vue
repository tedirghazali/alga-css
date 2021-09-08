<script lang="ts" setup>
import { ref } from 'vue'
</script>

<template>
  <div class="container pd-4">
    <h3 :class="['txtCenter', 'bgPrimary', {'rd-2': isActive(), 'bdSolid-1': true}]">Test Extracting Classes</h3>
    <span v-bind:class="['mg-5']"></span>
  </div>
</template>

<template>
  <q-page class="q-pa-md">
    <section>
      <q-btn color="primary" @click="runBenchmarkTests()" label="Benchmark" />
    </section>
    <section class="row items-center justify-evenly q-col-gutter-sm">
      <q-list>
        <q-item>
          <q-item-section>RxJS</q-item-section>
          <q-item-section>{{ formattedRxjs }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section>Axios</q-item-section>
          <q-item-section>{{ formattedAxios }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section>Mixed (Both Axios + RxJS)</q-item-section>
          <q-item-section>{{ formattedMixed }}</q-item-section>
        </q-item>
      </q-list>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { runBenchmark } from "src/lib/benchmarking";
import { getPostsUsingAxios, getPostsUsingRxjs } from "src/lib/services";
import { ref,computed } from "vue";

const rxjs = ref<number>();
const axios = ref<number>();
const mixed = ref<number>();

const formattedRxjs = computed( ()=>rxjs.value?rxjs.value.toFixed(3):'-')
const formattedAxios = computed( ()=>axios.value?axios.value.toFixed(3):'-')
const formattedMixed = computed( ()=>mixed.value?mixed.value.toFixed(3):'-')

async function runBenchmarkTests() {
  rxjs.value = undefined;
  axios.value = undefined;
  mixed.value = undefined;

  rxjs.value = await runBenchmark(async () => await getPostsUsingRxjs(), 100);
  axios.value = await runBenchmark(async () => await getPostsUsingAxios(), 100);
  mixed.value = await runBenchmark(async () => await getPostsUsingAxios(), 100);
}
</script>

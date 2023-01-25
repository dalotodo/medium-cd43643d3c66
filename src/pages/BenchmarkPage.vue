<template>
  <q-page class="q-pa-md">
    <section class="row items-center justify-evenly q-col-gutter-sm">
      <div class="col">
        <q-card>
          <q-toolbar class="bg-primary text-white">
            <q-toolbar-title>{{ t("title") }}</q-toolbar-title>
            <q-btn
              flat
              icon="play_arrow"
              @click="runBenchmarkTests()"
              label="Benchmark"
            />
          </q-toolbar>
          <q-card-section>
            <q-list dense>
              <q-item>
                <q-item-section>
                  <q-item-label>{{ t("tests") }}</q-item-label>
                  <q-item-label caption>{{ t("tests.caption") }}</q-item-label>
                </q-item-section>
                <q-item-section>
                  <q-slider
                    v-model="tests"
                    :min="1"
                    :max="100"
                    :step="1"
                    label
                    label-always
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-linear-progress indeterminate size="sm" v-if="isLoading" />
          <q-card-section>
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
          </q-card-section>
        </q-card>
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { runBenchmark } from "src/lib/benchmarking";
import { getPostsUsingAxios, getPostsUsingRxjs } from "src/lib/services";
import { getPostsUsingBoth } from "src/lib/services/mixed-services";
import { ref, computed, unref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const rxjs = ref<number>();
const axios = ref<number>();
const mixed = ref<number>();

const formattedRxjs = computed(() =>
  rxjs.value ? rxjs.value.toFixed(3) : "-"
);
const formattedAxios = computed(() =>
  axios.value ? axios.value.toFixed(3) : "-"
);
const formattedMixed = computed(() =>
  mixed.value ? mixed.value.toFixed(3) : "-"
);

const tests = ref(10);

const isLoading = ref(false);

async function runBenchmarkTests() {
  rxjs.value = undefined;
  axios.value = undefined;
  mixed.value = undefined;

  const loops = unref(tests);
  try {
    isLoading.value = true;
    rxjs.value = await runBenchmark(async () => await getPostsUsingRxjs(), loops);
    axios.value = await runBenchmark(async () => await getPostsUsingAxios(),loops);
    mixed.value = await runBenchmark(async () => await getPostsUsingBoth(), loops);
  } finally {
    isLoading.value = false;
  }
}
</script>

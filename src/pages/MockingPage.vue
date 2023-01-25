<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-sm">
      <div class="col">
        <q-card>
          <q-toolbar class="bg-primary text-white">
            <q-toolbar-title class="col">{{ t('title') }}</q-toolbar-title>
            <q-space />
            <q-btn icon="refresh" flat @click="refresh()" >{{ t('refresh') }}</q-btn>
          </q-toolbar>
          <q-card-section>
            <q-list dense>
              <q-item>
                <q-item-section>
                  <q-item-label>{{ t('delay') }}</q-item-label>
                  <q-item-label caption>{{ t('delay.caption') }}</q-item-label>
                </q-item-section>
                <q-item-section>
                    <q-slider v-model="delay" :min="0" :max="5000" :step="100" label :label-value="`${delay/1000}s`" label-always/>
                  </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-section>
            <q-list>
              <template v-for="item in items">
                <transition-group appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                <q-item :key="item.id">
                  <q-item-section>{{ item.id }}</q-item-section>
                  <q-item-section>{{ item.title }}</q-item-section>
                </q-item>
                </transition-group>
              </template>
              <q-inner-loading :showing="isLoading" color="primary"/>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<i18n>
  {
    'en-US': {
      'title': 'Mocking sample',
      'delay': 'Delay',
      'delay.caption': 'Set request delay in seconds',
    }
  }
</i18n>
<script setup lang="ts">
import { getPostsUsingMock } from "src/lib/services";
import { useQuasar } from "quasar";
import { onMounted, ref, unref } from "vue";
import { useI18n } from "vue-i18n";

type PostLike = { id: string; title: string };

const { t } = useI18n();
const $q = useQuasar();

const items = ref<PostLike[]>([]);

const isLoading = ref(false)
const delay = ref(3000);

async function refresh() {
  try {
    isLoading.value = true;
    items.value.splice(0);
    const data = await getPostsUsingMock(unref(delay));
    items.value.push(...data);
  } catch (err) {
    $q.notify({ type: "negative", position: "top", message: `${err}` });
  } finally {
    isLoading.value = false;
  }
}

onMounted(refresh);
</script>

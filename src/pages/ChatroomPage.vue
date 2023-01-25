<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-sm">
      <div class="col">
        <q-card>
          <q-toolbar class="bg-primary text-white">
            <q-toolbar-title class="col">{{ t('title') }}</q-toolbar-title>
            <q-space />
            <span v-if="user">@{{ user.id }}</span>
          </q-toolbar>
          <template v-if="!user">
            <q-form inline @submit.prevent="join()">
          <q-card-section class="row" >

            <div class="col">
            <q-input v-model="username" :placeholder="t('username.placeholder')" outlined></q-input>
            </div>
            <div class="col-auto">
            <q-btn :label="t('join')" />
            </div>
          </q-card-section>
          </q-form>
        </template>
          <template v-if="user">
            <q-card-section >
              <div class="row justify-center">
              <div style="width: 100%; max-width: 400px">
                <template v-for="message in messages">
                  <q-chat-message
                  :name="message.from"
                  avatar="https://cdn.quasar.dev/img/avatar1.jpg"
                  :text="[message.text]"
                  :sent="message.from===user?.id"
                />
                </template>


              </div>
            </div>
            </q-card-section>
            <q-form @submit.prevent="send()">
              <q-card-actions class="row"  >

                  <div class="col">
                  <q-input v-model="message" :placeholder="t('message.placeholder')" outlined></q-input>
                  </div>
                  <div class="col-auto">
                  <q-btn type="submit" :label="t('send.label')" />
                  </div>
              </q-card-actions>
            </q-form>
          </template>

        </q-card>
      </div>
    </div>
  </q-page>
</template>
<i18n>
  {
    'en-US': {
      'title': 'Push sample',
    }
  }
</i18n>
<script setup lang="ts">
import { useQuasar } from "quasar";
import { onMounted, ref, unref } from "vue";
import { useI18n } from "vue-i18n";
import { ChatMessage, InteractiveChatter, createChatRoom, createChatter, createChatbot } from "src/lib/chatroom";

const { t } = useI18n();
const $q = useQuasar();

const messages = ref<ChatMessage[]>([]);

const username = ref('')
const user = ref<InteractiveChatter>()

const chatroom = createChatRoom();

chatroom.messages$.subscribe( (msg)=> {
  messages.value.push(msg);
})

function join() {
  user.value = createChatter(unref(username))
  chatroom.join(user.value);
}

const message = ref('');
function send() {
  user.value?.send(unref(message))
  message.value = ''
}

onMounted( ()=> {
  chatroom.join( createChatbot('user-1',3000) )
  chatroom.join( createChatbot('user-2',5000) )
  chatroom.join( createChatbot('user-3',8000) )
});
</script>

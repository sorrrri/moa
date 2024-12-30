<template>
  <section v-if="events?.length > 0" class="section-event">
    <div class="wrapper">
      <ul>
        <li v-for="(list, index) in events" :key="index" class="notice">
          <div class="image">
            <img
              :src="list.img_thumbnail"
              alt=""
              @error="(event) => (event.target.src = '/images/common/no_image.png')"
            />
          </div>
          <div class="texts">
            <strong>{{ list.subject }}</strong>
            <small>{{ formatted(list.regist_date, 'dot') }}</small>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
<script setup>
import { useBoard } from '~/composables/board.js'
import { useFormatter } from '~/composables/subs.js'
const { events } = useBoard()
const { formatted } = useFormatter()
</script>

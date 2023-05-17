<template>
  <div>{{ typedText }}</div>
</template>
  
<script setup>
import { defineProps, ref, onMounted, onUnmounted } from 'vue'

function useTypingEffect(text, delay) {
  const typedText = ref('')
  let index = 0
  let timerId

  function type() {
    if (index < text.length) {
      typedText.value += text[index]
      index++
      timerId = setTimeout(type, delay)
    }
  }

  onMounted(() => {
    timerId = setTimeout(type, delay)
  })

  onUnmounted(() => {
    clearTimeout(timerId)
  })

  return {
    typedText
  }
}
const props = defineProps(['text', 'delay'])
const { typedText } = useTypingEffect(props.text, props.delay)

</script>
  
<template>
    <component v-bind="linkProps(to)"  @click="setAction(to, department)">
        <slot></slot>
    </component>
</template>

<script>
  export default {
    props: {
      to: {
        type: String,
        required: true
      },
      department: {
        type: String,
        required: true
      }
    },
    methods: {
      setAction (url, department) {
        this.$store.dispatch('PUT_ACTION', {url, department})
      },
      linkProps (url) {
        if (url.match(/^(http(s)?|ftp):\/\//)) {
          return {
            is: 'a',
            href: url,
            target: '_blank',
            rel: 'noopener'
          }
        }
        return {
          is: 'nuxt-link',
          to: url
        }
      }
    }
  }
</script>
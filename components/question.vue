<template>
    <div>
    <p>{{ question.question }}</p>
        <template v-if="question.advice">
            <v-tooltip right>
                <external-link :to="question.advice.url" :department="question.advice.department">{{ question.advice.message }}</external-link>
                <a dark color="primary" slot="activator" target="_blank" v-bind:href="question.advice.url">{{ question.advice.message }}</a>
                <span>This link will open in a new window.</span>
            </v-tooltip>
        </template>
    </div>
</template>

<script>
  import ExternalLink from '~/components/external-link.vue'

  export default {
    components: { ExternalLink },
    props: {
      question: { type: Object },
      helps: { type: Object }
    }
  }
</script>
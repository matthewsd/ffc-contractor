<template>
    <v-layout
            justify-center
            align-center v-if="!loaded">
        <div style="text-align:center;">
            <v-progress-circular indeterminate v-bind:size="300" v-bind:width="2" color="orange">Loading...</v-progress-circular>
        </div>
    </v-layout>
    <v-container grid-list-md v-else-if="loaded">
        <v-toolbar color="deep-orange darken-4" dark>
            <v-icon>assignment</v-icon>
            <v-toolbar-title>Standard Questions</v-toolbar-title>
        </v-toolbar>
        <v-form>
            <v-layout row wrap v-for="(question, i) in standardSector" v-bind:key="question.question_id">
                <QuestionRow :question="question" :count="i"></QuestionRow>
                <QuestionRow v-for="(subQuestion, si) in question.sub_questions"
                             v-if="question.answer === subQuestion.question_activated_on"
                             :key="'s'+subQuestion.question_id"
                             :question="subQuestion"
                             :count="i"
                             :subcount="si + 1"></QuestionRow>
            </v-layout>
            <v-spacer></v-spacer>
            <v-btn color="success" style='float:right' @click="submit">Save Answers <v-icon>done</v-icon></v-btn>
        </v-form>
    </v-container>
</template>

<script>
  // import Api from '~/utilities/api'
  import QuestionRow from '~/components/question-row'
  import LoadingCircle from '~/components/loading-circle'
  import { mapState } from 'vuex'

  export default {
    middleware: 'auth',
    components: {
      QuestionRow,
      LoadingCircle
    },
    async asyncData (context) {
      await context.store.dispatch('GET_STANDARD_SECTOR')
    },
    computed: mapState(['standardSector']),
    data: () => ({
      menu: false,
      loaded: false,
      dateFormatted: null
    }),
    mounted: function () {
      this.loaded = true
    },
    methods: {
      async submit () {
        this.$store.dispatch('PUT_STANDARD_SECTOR', this.standardSector)
        this.$store.commit('SET_ALERT', { message: 'Successfully saved your answers.', colour: 'green darken-2', active: true })
        this.$store.dispatch('GET_NAVIGATION')
        this.$router.replace({ path: '/' })
      }
    }
  }
</script>

<style scoped>

</style>
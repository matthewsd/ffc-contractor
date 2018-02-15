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
            <v-toolbar-title>{{ workSector.workSector.name }} Work Sector</v-toolbar-title>
        </v-toolbar>
        <!--<v-container grid-list-md>-->
        <v-form>
            <v-layout row wrap v-for="(question, i) in workSector.questions" v-bind:key="question.question_id">
                <QuestionRow :question="question" :count="i"></QuestionRow>
                <QuestionRow v-for="(subQuestion, si) in question.sub_questions"
                             v-if="question.answer === subQuestion.question_activated_on"
                             :key="'s'+subQuestion.question_id"
                             :question="subQuestion"
                             :count="i"
                             :subcount="si + 1"></QuestionRow>
            </v-layout>
            <v-btn color="success" style='float:right' @click="submit">Save Answers <v-icon>done</v-icon></v-btn>
        </v-form>
        <!--</v-container>-->
    </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import QuestionRow from '~/components/question-row'

  export default {
    middleware: 'auth',
    data () {
      return {
        loaded: false
      }
    },
    mounted: function () {
      this.loaded = true
    },
    components: {
      QuestionRow
    },
    async asyncData (context) {
      await context.store.dispatch('GET_WORK_SECTOR', context.params.id)
    },
    computed: mapState(['workSector']),
    methods: {
      async submit () {
        this.$store.dispatch('PUT_WORK_SECTOR', this.workSector)
        this.$store.commit('SET_ALERT', { message: 'Successfully saved your answers.', colour: 'green darken-2', active: true })
        this.$store.dispatch('GET_NAVIGATION')
        this.$router.replace({ path: '/' })
        // console.log(this.workSector)
        // Api.put('/questions/answers/save', this.data).then((response) => {
        //   if (response.status === 200) {
        //     this.$store.dispatch('getWorkSectors')
        //     this.$store.commit('SET_ALERT', { message: 'Successfully saved your answers.', colour: 'green darken-2' })
        //     this.$router.replace({ path: '/dashboard' })
        //   }
        // })
      }
    }
  }
</script>
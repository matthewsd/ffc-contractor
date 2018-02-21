<style>
    .dz-image img{
        background-color: #ccc;
        min-width: 180px;
        width:100% !important;
    }
    .dropzone .dz-preview.dz-file-preview .dz-image {
        min-width: 180px !important;
    }

</style>
<template>
    <v-flex row xs12>
        <!--<v-card color="white">-->
        <v-card :color="(subcount)?'grey lighten-2': 'white'">
            <v-card-text>
                <v-layout row wrap>
                    <v-flex d-flex xs12 md8 lg10>
                        <v-layout row wrap>
                            <v-flex xs12 md12 lg4>
                                <p><v-icon v-if="question.question_add_expiry && moment(question.answer_date_expires) > moment()" color="red">warning</v-icon><strong>Q{{count + 1}}{{ subcount ? '.' + subcount : null }}: </strong>
                                    <Question :question="question"></Question>
                                </p>
                            </v-flex>
                            <v-flex xs12 md12 lg4>
                                <v-text-field
                                        v-if="question.answer_type == 'freetext'"
                                        :label='"Answer" + ((question.answer_isRequired == 1)? "*" : "")'
                                        v-model="question.answer"
                                        multi-line
                                        rows="3"
                                        :counter="255"
                                >
                                </v-text-field>
                                <v-text-field
                                        v-if="question.answer_type == 'textbox'"
                                        :label='"Answer" + ((question.answer_isRequired == 1)? "*" : "")'
                                        v-model="question.answer"
                                        :counter="255"
                                >
                                </v-text-field>
                                <v-select
                                        v-if="question.answer_type == 'yesnona'"
                                        v-model="question.answer"
                                        :items="yesnona_items"
                                        :label='"Please select answer" + ((question.answer_isRequired == 1)? "*" : "")'
                                        single-line
                                        bottom
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 md12 lg4>

                                <v-menu v-if="question.question_add_expiry == 1"
                                        ref="question.date_picker_shown"
                                        lazy
                                        :close-on-content-click="false"
                                        v-model="question.date_picker_shown"
                                        transition="scale-transition"
                                        offset-y
                                        full-width
                                        :nudge-left="18"
                                        min-width="290px"
                                        :return-value.sync="question.answer_date_expires"
                                >
                                    <v-text-field
                                            slot="activator"
                                            label="Date Expires"
                                            v-model="question.answer_date_expires"
                                            prepend-icon="event"
                                            readonly
                                    ></v-text-field>
                                    <v-date-picker v-model="question.answer_date_expires"
                                                   color="orange darken-2"
                                                   scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn flat color="primary" @click="question.date_picker_shown = false">Cancel</v-btn>
                                        <v-btn flat color="primary" @click="$refs.question.date_picker_shown.save(question.answer_date_expires)">OK</v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex d-flex xs12 md4 lg2>
                        <v-flex d-flex xs12>
                            <vue-dropzone
                                    v-if="question.question_add_evidence == 1"
                                    :ref='"dropzone" + ( subcount ? "-sub" : "") + question.question_id'
                                    :id='"dropzone" + ( subcount ? "-sub" : "") + question.question_id'
                                    v-on:vdropzone-complete="uploadSuccess"
                                    v-on:vdropzone-processing="processing"
                                    @vdropzone-removed-file="removeFile"
                                    v-on:vdropzone-mounted="loadFile('dropzone' + ( subcount ? '-sub' : '') + question.question_id, question)"
                                    :options='question.dropOptions'
                            >
                            </vue-dropzone>
                        </v-flex>
                    </v-flex>
                </v-layout>
            </v-card-text>
        </v-card>
    </v-flex>
</template>

<script>
  import vue2Dropzone from 'vue2-dropzone'
  import 'vue2-dropzone/dist/vue2Dropzone.css'
  import Question from '~/components/question'
  import { mapState } from 'vuex'
  import moment from 'moment'

  export default {
    props: {
      question: { type: Object },
      subcount: 0,
      count: 0
    },
    components: {
      Question,
      vueDropzone: vue2Dropzone
    },
    data: () => ({
      max: 0,
      rowColour: 'white',
      menu: false,
      dateFormatted: null,
      yesnona_items: [
        { text: 'Yes', value: 'yes' },
        { text: 'No', value: 'no' },
        { text: 'N.A', value: 'na' }
      ]
    }),
    async asyncData (context) {
      await context.store.dispatch('GET_HELPS')
    },
    computed: mapState(['helps']),
    methods: {
      loadFile: function (ref, question) {
        if (question.answer_evidence !== null) {
          var file = {name: question.answer_evidence}
          var url = question.answer_evidence_url
          this.$refs[ref].manuallyAddFile(file, url)
        }
      },
      async uploadSuccess (response) {
        this.question.answer_evidence = response.name
        this.$store.commit('SET_BUTTON_STATE', false)
      },
      removeFile () {
        this.question.answer_evidence = null
        this.question.current_score--
      },
      processing () {
        this.$store.commit('SET_BUTTON_STATE', true)
      },
      moment: function (date) {
        if (date) {
          return moment(date)
        } else {
          return moment()
        }
      }
    }
  }
</script>
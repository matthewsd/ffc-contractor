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
        <v-card :color="(question.question_add_expiry == 1 && moment(question.answer_date_expires).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'))?'red lighten-4':(subcount)?'grey lighten-2': 'white'">
            <v-card-text>
                <v-layout row wrap>
                    <v-flex d-flex xs12 md8 lg10>
                        <v-layout row wrap>
                            <v-flex xs12 md12 lg4>
                                <p v-if="question.question_add_expiry == 1 && moment(question.answer_date_expires).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')"
                                >
                                    <v-icon color="red">warning</v-icon>&nbsp;<strong>Answer has Expired</strong>
                                </p>
                                <p>
                                    <strong>Q{{count + 1}}{{ subcount ? '.' + subcount : null }}: </strong>
                                    <Question :question="question"></Question>
                                </p>
                            </v-flex>
                            <v-flex xs12 md12 lg4>
                                <v-textarea
                                        v-if="question.answer_type == 'freetext' || question.answer_type == 'textarea'"
                                        :label='"Answer" + ((question.answer_isRequired == 1)? "*" : "")'
                                        v-model="question.answer"
                                        rows="3"
                                        :counter="255"
                                >
                                </v-textarea>
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
                                        :menu-props="bottom"
                                ></v-select>
                                <v-select
                                        v-if="question.answer_type == 'yesno'"
                                        v-model="question.answer"
                                        :items="yesno_items"
                                        :label='"Please select answer" + ((question.answer_isRequired == 1)? "*" : "")'
                                        :menu-props="bottom"
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 md12 lg4>
                                <v-menu
                                        v-if="question.question_add_expiry == 1"
                                        ref="menu"
                                        :close-on-content-click="false"
                                        v-model="menu"
                                        :nudge-right="40"
                                        :return-value.sync="question.answer_date_expires"
                                        lazy
                                        transition="scale-transition"
                                        full-width
                                        min-width="290px"
                                >
                                    <v-text-field
                                            slot="activator"
                                            v-model="question.answer_date_expires"
                                            :label='"Date Expires" + ((question.answer_expiry_isRequired == 1)? "*" : "")'
                                            prepend-icon="event"
                                            readonly
                                    ></v-text-field>
                                    <v-date-picker v-model="question.answer_date_expires" color="orange darken-2" scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                                        <v-btn flat color="primary" @click="$refs.menu.save(question.answer_date_expires)">OK</v-btn>
                                    </v-date-picker>
                                </v-menu>
                                <!--<v-menu v-if="question.question_add_expiry == 1"-->
                                        <!--ref="question.date_picker_shown"-->
                                        <!--lazy-->
                                        <!--:close-on-content-click="false"-->
                                        <!--v-model="question.date_picker_shown"-->
                                        <!--transition="scale-transition"-->
                                        <!--offset-y-->
                                        <!--full-width-->
                                        <!--:nudge-left="18"-->
                                        <!--min-width="290px"-->
                                        <!--:return-value.sync="question.answer_date_expires"-->
                                <!--&gt;-->
                                    <!--<v-text-field-->
                                            <!--slot="activator"-->
                                            <!--:label='"Date Expires" + ((question.answer_expiry_isRequired == 1)? "*" : "")'-->
                                            <!--v-model="question.answer_date_expires"-->
                                            <!--prepend-icon="event"-->
                                            <!--readonly-->
                                    <!--&gt;</v-text-field>-->
                                    <!--<v-date-picker v-model="question.answer_date_expires"-->
                                                   <!--color="orange darken-2"-->
                                                   <!--locale="gb-gb"-->
                                                   <!--scrollable>-->
                                        <!--<v-spacer></v-spacer>-->
                                        <!--<v-btn flat color="primary" @click="question.date_picker_shown = false">Cancel</v-btn>-->
                                        <!--<v-btn flat color="primary" @click="$refs.question.date_picker_shown.save(question.answer_date_expires)">OK</v-btn>-->
                                    <!--</v-date-picker>-->
                                <!--</v-menu>-->
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex xs12 md4 lg2 style="text-align:center;">
                        <v-btn outline flat small color="orange" v-if="question.answer_evidence && question.question_add_evidence == 1" download target="_blank" :href="question.answer_evidence_url">{{ question.answer_evidence }} &nbsp; <v-icon>visibility</v-icon></v-btn>
                            <vue-dropzone
                                    v-if="question.question_add_evidence == 1"
                                    :ref='"dropzone" + ( subcount ? "sub" : null) + question.question_id'
                                    :id='"dropzone" + ( subcount ? "sub" : null) + question.question_id'
                                    v-on:vdropzone-complete="uploadSuccess"
                                    v-on:vdropzone-processing="processing"
                                    @vdropzone-removed-file="removeFile"
                                    :options='question.dropOptions'
                            >
                            </vue-dropzone>
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
      question: Object,
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
      ],
      yesno_items: [
        { text: 'Yes', value: 'yes' },
        { text: 'No', value: 'no' },
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
        if (response) {
          if (response.xhr) {
            if (response.xhr.response) {
              let res = JSON.parse(response.xhr.response)
              this.question.answer_evidence = res.FileName
            }
          } else {
            this.question.answer_evidence = response.name
          }
        } else {
          console.log('Response not set.')
        }
        this.$store.commit('SET_BUTTON_STATE', false)
      },
      removeFile () {
        this.question.answer_evidence = null
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

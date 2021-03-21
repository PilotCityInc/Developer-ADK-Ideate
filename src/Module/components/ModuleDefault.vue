<template>
  <!-- eslint-disable-next-line vue/no-unused-vars -->
  <ValidationObserver v-slot="{ invalid }" slim>
    <v-container class="module-default pa-0">
      <div>
        <v-expansion-panels v-model="showInstructions" flat>
          <v-expansion-panel>
            <v-expansion-panel-header
              v-show="showInstructions"
              hide-actions
              class="pa-0"
              @click="showInstructions = true"
            >
              <template v-slot="{ open }">
                <v-scroll-y-transition hide-on-leave>
                  <div v-if="!open" class="d-flex flex-column justify-center">
                    <v-icon color="grey lighten-2" class="d-flex justify-center">
                      mdi-chevron-down
                    </v-icon>
                    <div color="grey lighten-2" class="module-default__collapse-title">
                      INSTRUCTIONS
                    </div>
                  </div>
                </v-scroll-y-transition>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <Instruct readonly />
              <div @click="showInstructions = true">
                <div class="module-default__collapse-title">CLOSE</div>
                <!-- <div class="hr"/> OPTIONAL -->
                <v-icon color="grey lighten-2" class="d-flex justify-center">
                  mdi-chevron-up
                </v-icon>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <v-progress-linear
        class="mt-3"
        color="#dedede"
        height="2"
        value="100"
        buffer-value="100"
        stream
      />
      <div class="pa-6">
        <div class="module-default__row mb-10">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn rounded v-bind="attrs" dark color="green" depressed v-on="on"
                ><v-icon left>mdi-form-select</v-icon>
                {{ finalDraftSaved + ' #' + display }}
              </v-btn>
            </template>
            <v-card v-for="draft in adkData.vlaueDrafts.length" :key="draft" class="module__menu">
              <v-btn
                v-if="draft > 1"
                small
                color="white"
                class="module__chat-menu-button v-btn__content"
                tile
                depressed
                @click="showDraft(draft)"
              >
                <v-icon left color="#404142"> mdi-form-select </v-icon>
                Draft #{{ adkData.vlaueDrafts.length + 1 - draft }}
              </v-btn>
              <!-- <v-card v-if="indexNum" class="mx-auto" max-width="344" outlined>
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="overline mb-4">Draft #{{ indexNum }} :</div>
                    <v-list-item-title class="headline mb-1">Problem</v-list-item-title>
                    <v-list-item-subtitle>
                      {{ adkData.vlaueDrafts[indexNum - 1].problem }}
                    </v-list-item-subtitle>
                    <v-list-item-title class="headline mb-1">Solution</v-list-item-title>
                    <v-list-item-subtitle>{{
                      adkData.vlaueDrafts[indexNum - 1].solution
                    }}</v-list-item-subtitle>
                    <v-list-item-title class="headline mb-1">Innovation</v-list-item-title>
                    <v-list-item-subtitle>{{
                      adkData.vlaueDrafts[indexNum - 1].innovation
                    }}</v-list-item-subtitle>
                    <v-list-item-title class="headline mb-1">User</v-list-item-title>
                    <v-list-item-subtitle>{{
                      adkData.vlaueDrafts[indexNum - 1].user
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item> -->
              <!-- <v-card-actions>
                  <v-btn class="btn_expand" rounded x-large outlined depressed> Expand </v-btn>
                </v-card-actions> -->
              <!-- </v-card> -->
              <!-- <v-divider></v-divider>
              <v-btn
                small
                color="white"
                class="module__chat-menu-button v-btn__content"
                tile
                depressed
              >
                <v-icon left color="#404142">mdi-form-select</v-icon>3rd Draft</v-btn
              >
              <v-divider></v-divider>
              <v-btn
                small
                color="white"
                class="module__chat-menu-button v-btn__content"
                tile
                depressed
              >
                <v-icon left color="#404142">mdi-form-select</v-icon>2nd Draft</v-btn
              >

              <v-divider></v-divider>
              <v-btn
                small
                color="white"
                class="module__chat-menu-button v-btn__content"
                tile
                depressed
              >
                <v-icon left color="#404142">mdi-form-select</v-icon>1st Draft</v-btn
              > -->
            </v-card>
          </v-menu>
        </div>
        <validation-provider v-slot="{ errors }" slim rules="required">
          <v-textarea
            v-model="adkData.vlaueDrafts[IndexVal].problem"
            rounded
            :readonly="userType === 'stakeholder'"
            auto-grow
            :error-messages="errors"
            placeholder="What 'hair on fire' problem or opportunity are you solving for?"
            prepend-inner-icon="mdi-fire"
            class="module-default__textarea"
            :counter="adkData.maxCharacters"
            :maxlength="adkData.maxCharacters"
            outlined
            label="Problem or Opportunity"
          ></v-textarea>
        </validation-provider>
        <br />
        <validation-provider v-slot="{ errors }" slim rules="required">
          <v-textarea
            v-model="adkData.vlaueDrafts[IndexVal].solution"
            rounded
            auto-grow
            :error-messages="errors"
            placeholder="What bright idea do you have as a solution?"
            prepend-inner-icon="mdi-head-snowflake"
            class="module-default__textarea"
            :counter="adkData.maxCharacters"
            :maxlength="adkData.maxCharacters"
            outlined
            :readonly="(submittedFinal = false)"
            label="Solution or Product"
          ></v-textarea>
        </validation-provider>
        <br />
        <validation-provider v-slot="{ errors }" slim rules="required">
          <v-textarea
            v-model="adkData.vlaueDrafts[IndexVal].innovation"
            rounded
            auto-grow
            :error-messages="errors"
            placeholder="What unique value does your solution deliver?"
            prepend-inner-icon="mdi-lightning-bolt"
            class="module-default__textarea"
            :counter="adkData.maxCharacters"
            :maxlength="adkData.maxCharacters"
            outlined
            label="Innovation or Unique Value"
          ></v-textarea>
        </validation-provider>
        <br />
        <validation-provider v-slot="{ errors }" slim rules="required">
          <v-textarea
            v-model="adkData.vlaueDrafts[IndexVal].user"
            rounded
            auto-grow
            :error-messages="errors"
            placeholder="Identify and describe the user and customer of the solution"
            prepend-inner-icon="mdi-account-group"
            class="module-default__textarea"
            :counter="adkData.maxCharacters"
            :maxlength="adkData.maxCharacters"
            outlined
            label="User or Customer"
          ></v-textarea>
        </validation-provider>
        <br />
        <div class="module-default__row">
          <div>
            <v-btn rounded x-large outlined depressed @click="draftSave">Save Draft</v-btn>
          </div>
          <!-- <v-alert
            v-if="success == true"
            type="success"
            dismissible
            border="left"
            close-text="Close Alert"
          >
            Draft saved!
          </v-alert>
          <v-alert
            v-if="success == false"
            type="error"
            dismissible
            border="left"
            close-text="Close Alert"
          >
            Error saving draft. Maybe duplicate data or other reason!
          </v-alert> -->
          <div class="ml-auto">
            <v-btn :disabled="invalid" x-large rounded color="green" depressed @click="finalDraft">
              Make Final Draft
            </v-btn>
          </div>
          <!-- <div><v-btn small disabled depressed>Current Version</v-btn></div>
        <div><v-btn small outlined depressed>Version 4</v-btn></div>
        <div><v-btn small outlined depressed>Version 3</v-btn></div>
        <div><v-btn small outlined depressed>Version 2</v-btn></div>
        <div><v-btn small outlined depressed>Version 1</v-btn></div> -->
        </div>
        <!-- ENTER CONTENT HERE -->
        <!-- DESIGN YOUR ACTIVITY HERE / COMMENT OUT WHEN YOU'VE STARTED DESIGNING -->
        <!-- <div class="module-default__none">Design your activity here</div> -->
      </div>
    </v-container>
  </ValidationObserver>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@vue/composition-api';
import { getModAdk, getModMongoDoc } from 'pcv4lib/src';
import Swal from 'sweetalert2';
import Instruct from './ModuleInstruct.vue';
import MongoDoc from '../types';

export default defineComponent({
  name: 'ModuleDefault',
  components: {
    Instruct
  },
  props: {
    value: {
      required: true,
      type: Object as PropType<MongoDoc>
    },
    studentDoc: {
      required: true,
      type: Object as PropType<MongoDoc | null>,
      default: () => {}
    },
    userType: {
      required: true,
      type: String
      // participant: '',
      // organizer: '',
      // stakeholder: ''
    }
  },
  setup(props, ctx) {
    const studentDocument = getModMongoDoc(props, ctx.emit, {}, 'studentDoc', 'inputStudentDoc');

    const initIdeateDefault = {
      vlaueDrafts: [
        {
          problem: '',
          solution: '',
          innovation: '',
          user: '',
          finalDraft: false,
          draftIndex: '0'
          // draftIndex: ''
        }
      ]
    };

    const { adkData, adkIndex } = getModAdk(
      props,
      ctx.emit,
      'Ideate',
      initIdeateDefault,
      'studentDoc',
      'inputStudentDoc'
    );

    const IndexVal = ref(adkData.value.vlaueDrafts.length - 1);
    const display = ref(IndexVal.value);
    const finalDraftSaved = ref('Draft');
    const success = ref();

    function draftSave() {
      const draftNum = adkData.value.vlaueDrafts.length - 1;
      const draft = ref({
        problem: adkData.value.vlaueDrafts[IndexVal.value].problem,
        solution: adkData.value.vlaueDrafts[IndexVal.value].solution,
        innovation: adkData.value.vlaueDrafts[IndexVal.value].innovation,
        user: adkData.value.vlaueDrafts[IndexVal.value].user,
        finalDraft: false,
        draftIndex: IndexVal.value + 1
        // index: ''
      });
      if (
        adkData.value.vlaueDrafts[draftNum].problem.length !== 0 ||
        adkData.value.vlaueDrafts[draftNum].solution.length !== 0 ||
        adkData.value.vlaueDrafts[draftNum].innovation.length !== 0 ||
        adkData.value.vlaueDrafts[draftNum].user.length !== 0
      ) {
        if (adkData.value.vlaueDrafts.length - 1 <= 0) {
          adkData.value.vlaueDrafts.push(draft.value);
          // console.log('draft saved, first draft');
          // console.log(adkData.value.vlaueDrafts);
          // eslint-disable-next-line no-plusplus
          IndexVal.value++;
          // eslint-disable-next-line no-plusplus
          display.value++;
          console.log(display.value);
          success.value = true;
          Swal.fire({
            type: 'success',
            title: 'Success!',
            text: 'Your draft has been successfully saved!'
          });
        } else if (adkData.value.vlaueDrafts.length - IndexVal.value === 2) {
          console.log('first item');
        } else if (
          adkData.value.vlaueDrafts[draftNum].problem !==
            adkData.value.vlaueDrafts[draftNum - 1].problem ||
          adkData.value.vlaueDrafts[draftNum].solution !==
            adkData.value.vlaueDrafts[draftNum - 1].solution ||
          adkData.value.vlaueDrafts[draftNum].innovation !==
            adkData.value.vlaueDrafts[draftNum - 1].innovation ||
          adkData.value.vlaueDrafts[draftNum].user !== adkData.value.vlaueDrafts[draftNum - 1].user
        ) {
          adkData.value.vlaueDrafts.push(draft.value);
          // console.log('draft saved');
          // console.log(adkData.value.vlaueDrafts);
          success.value = true;
          // eslint-disable-next-line no-plusplus
          IndexVal.value++;
          // eslint-disable-next-line no-plusplus
          display.value++;
          console.log(display.value);
          Swal.fire({
            type: 'success',
            title: 'Success!',
            text: 'Your draft has been successfully saved!'
          });
        } else {
          // console.log('duplicate data');
          // success = false;
          Swal.fire({
            type: 'success',
            title: 'Success!',
            text: 'Your draft has been successfully saved!'
          });
        }
      } else {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'You forgot to write something in!'
          // footer: 'asd'
        });
      }
    }
    const indexNum = '';

    const finalDraftIndex = ref('');
    function finalDraft() {
      // console.log('saved final draft');

      // console.log(adkData.value.vlaueDrafts[IndexVal.value].finalDraft);
      // const submittedFinal = true;
      adkData.value.vlaueDrafts[IndexVal.value].draftIndex = IndexVal.value;
      // console.log(adkData.value.vlaueDrafts[IndexVal.value].draftIndex);
      adkData.value.vlaueDrafts.splice(
        adkData.value.vlaueDrafts.length - 1,
        0,
        adkData.value.vlaueDrafts[IndexVal.value]
      );
      adkData.value.vlaueDrafts[adkData.value.vlaueDrafts.length - 1].finalDraft = true;
      // console.log(adkData.value.vlaueDrafts[adkData.value.vlaueDrafts.length - 1].finalDraft);
      // adkData.value.vlaueDrafts.push(draft.value);
      // console.log(adkData.value.vlaueDrafts);
      finalDraftSaved.value = 'Final: Draft';
      display.value = IndexVal.value + 1;
      console.log(display.value);
      Swal.fire({
        type: 'success',
        title: 'Success!',
        text: 'Successfully marked as final draft!'
      });
      adkData.value.update(() => ({
        isComplete: true,
        adkIndex
      }));
      // IndexVal.value = adkData.value.vlaueDrafts.length - 1;
    }

    function showDraft(draft: number) {
      // console.log(draft - 1);
      // IndexVal.value = draftIndex;
      // if (IndexVal.value !== draftIndex) {
      //   return draftIndex;
      //   // IndexVal.value = draftIndex;
      // }
      // console.log(adkData.value.vlaueDrafts[draftIndex - 1].innovation);
      // eslint-disable-next-line operator-assignment
      IndexVal.value = adkData.value.vlaueDrafts.length - draft;
      display.value = IndexVal.value + 1;
      console.log(display.value);
      // console.log(IndexVal.value);
      // console.log(adkData.value.vlaueDrafts[IndexVal.value].finalDraft);
      if (adkData.value.vlaueDrafts[IndexVal.value + 1].finalDraft === true) {
        finalDraftSaved.value = 'Final: Draft';
        // console.log('this is a final draft');
      } else {
        finalDraftSaved.value = 'Draft';
      }

      return draft;
    }

    const setupInstructions = ref({
      description: '',
      instructions: ['', '', '']
    });

    return {
      studentDocument,
      setupInstructions,
      showInstructions: 'true',
      draftSave,
      IndexVal,
      finalDraft,
      showDraft,
      // draftNum,
      finalDraftSaved,
      indexNum,
      finalDraftIndex,
      display,
      adkData,
      success
    };
  }
  // setup() {
  //   const questionAns = reactive({
  //     problem: '',
  //     solution: '',
  //     innovation: '',
  //     user: ''
  //   });

  //   const setupInstructions = ref({
  //     description: '',
  //     instructions: ['', '', '']
  //   });
  //   const showInstructions = ref(true);
  //   return {
  //     setupInstructions,
  //     showInstructions,
  //     ...toRefs(questionAns)
  //   };
  // }
});
</script>

<style lang="scss">
.module-default {
  &__row {
    flex-direction: row;
    display: flex;
  }
  &__check {
    margin-right: 35px;
    // width: 100%;
  }
  &__none {
    border-radius: 5px;
    // border: 1px solid #dedede;
    height: 100px;
    text-align: center;
    background-color: #dedede;
    font-weight: 700;
    color: #ffffff;
    font-size: 18px;
    padding-top: 35px;
  }

  &__collapse-divider {
    margin-top: 15px;
    // margin-bottom: 75px;
    margin-right: none;
    margin-left: none;
    padding-right: none;
    padding-left: none;
    width: 100%;
  }

  &__collapse-title {
    color: #dedede;
    text-align: center;
    text-transform: uppercase;
    font-weight: 900;
    letter-spacing: 1px;
    font-size: 13px;
    //  text-uppercase font-weight-bold text-subtitle-2 text-center
  }

  &__container {
    // width: 100%;
    // padding: none;
    // margin: none;
    margin-top: 0px;
    padding: 0px;
  }
  &__employer-title {
    font-size: 25px;
    font-weight: 700;
  }

  &__scope {
    font-size: 22px;
    font-weight: 800;
    text-align: center;
    max-width: 95%;
    margin: auto;
  }
  &__youtube {
    height: 400px;
    width: 95%;
    border-radius: 25px;
    // margin: 0px;
    background-color: #dedede;

    // text-align: center;
    // justify-content: center;
    // align-items: center;
    // padding-top: auto;
    // padding-bottom: auto;
  }
  &__about {
    font-size: 15px;
    font-weight: 700;
    text-align: center;
    max-width: 90%;
    margin: auto;
    line-height: 30px;
  }

  &__faq {
    font-size: 15px;
    font-weight: 700;
    text-align: center;
    max-width: 90%;
    margin: auto;
    line-height: 30px;
  }

  &__faq-chat {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-bottom: 5%;
  }
  &__faq-chat-line {
    margin: 5px;
  }

  &__faq-avatar {
    margin: 5px;
  }

  &__faq-question {
    // text-align: left;
    font-family: 'Raleway';
    font-size: 16px;
    font-weight: 800;
    color: #404142;
  }

  &__faq-answer {
    text-align: left;
    font-family: 'Raleway';
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0px;
    color: white;
    font-style: italic;
  }

  &__faq-answer-dark {
    text-align: left;
    font-family: 'Raleway';
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0px;
    color: #404142;
    font-style: italic;
  }

  &__faq-answer-dark-highlight {
    text-align: left;
    font-family: 'Raleway';
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0px;
    color: #404142;
  }

  &__specs-title {
    font-weight: 800;
  }
}
</style>

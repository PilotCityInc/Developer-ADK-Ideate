<template>
  <!-- eslint-disable-next-line vue/no-unused-vars -->
  <ValidationObserver v-slot="{ invalid }" slim>
    <div>
      <div class="module-default__instructions">
        <v-expansion-panels v-model="showInstructions" class="module-default__instructions" flat>
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
        <div class="mb-10">
          <v-menu open-on-hover offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="font-weight-bold" rounded v-bind="attrs" dark depressed v-on="on"
                ><v-icon left>mdi-form-select</v-icon>
                {{ finalDraftSaved + ' #' + display }}
              </v-btn>
            </template>
            <v-card v-for="draft in adkData.valueDrafts.length" :key="draft" class="module__menu">
              <v-btn
                outlined
                small
                class="draft-button mt-2 mb-1"
                width="100%"
                depressed
                rounded
                @click="showDraft(draft)"
              >
                Draft # {{ adkData.valueDrafts.length - draft }}
              </v-btn>
              <!-- <v-card v-if="indexNum" class="mx-auto" max-width="344" outlined>
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="overline mb-4">Draft #{{ indexNum }} :</div>
                    <v-list-item-title class="headline mb-1">Problem</v-list-item-title>
                    <v-list-item-subtitle>
                      {{ adkData.valueDrafts[indexNum - 1].problem }}
                    </v-list-item-subtitle>
                    <v-list-item-title class="headline mb-1">Solution</v-list-item-title>
                    <v-list-item-subtitle>{{
                      adkData.valueDrafts[indexNum - 1].solution
                    }}</v-list-item-subtitle>
                    <v-list-item-title class="headline mb-1">Innovation</v-list-item-title>
                    <v-list-item-subtitle>{{
                      adkData.valueDrafts[indexNum - 1].innovation
                    }}</v-list-item-subtitle>
                    <v-list-item-title class="headline mb-1">User</v-list-item-title>
                    <v-list-item-subtitle>{{
                      adkData.valueDrafts[indexNum - 1].user
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
            v-model="problem"
            rounded
            auto-grow
            :disabled="disabledPastDraft == 1"
            :error-messages="errors"
            placeholder="What 'hair on fire' problem or opportunity are you solving for?"
            prepend-inner-icon="mdi-fire"
            class="module-default__textarea"
            :counter="programDoc.data.adks[index].maxCharacters"
            :maxlength="programDoc.data.adks[index].maxCharacters"
            outlined
            :readonly="(submittedFinal = false) || readonly"
            label="Problem or Opportunity"
          ></v-textarea>
        </validation-provider>
        <br />
        <validation-provider v-slot="{ errors }" slim rules="required">
          <v-textarea
            v-model="solution"
            rounded
            :disabled="disabledPastDraft == 1"
            auto-grow
            :error-messages="errors"
            placeholder="What bright idea do you have as a solution?"
            prepend-inner-icon="mdi-head-snowflake"
            class="module-default__textarea"
            :counter="programDoc.data.adks[index].maxCharacters"
            :maxlength="programDoc.data.adks[index].maxCharacters"
            outlined
            :readonly="(submittedFinal = false) || readonly"
            label="Solution or Product"
          ></v-textarea>
        </validation-provider>
        <br />
        <validation-provider v-slot="{ errors }" slim rules="required">
          <v-textarea
            v-model="innovation"
            rounded
            :disabled="disabledPastDraft == 1"
            auto-grow
            :error-messages="errors"
            placeholder="What unique value does your solution deliver?"
            prepend-inner-icon="mdi-lightning-bolt"
            class="module-default__textarea"
            :counter="programDoc.data.adks[index].maxCharacters"
            :maxlength="programDoc.data.adks[index].maxCharacters"
            outlined
            :readonly="(submittedFinal = false) || readonly"
            label="Innovation or Unique Value"
          ></v-textarea>
        </validation-provider>
        <br />
        <validation-provider v-slot="{ errors }" slim rules="required">
          <v-textarea
            v-model="user"
            rounded
            auto-grow
            :disabled="disabledPastDraft == 1"
            :error-messages="errors"
            placeholder="Identify and describe the user and customer of the solution"
            prepend-inner-icon="mdi-account-group"
            class="module-default__textarea"
            :counter="programDoc.data.adks[index].maxCharacters"
            :maxlength="programDoc.data.adks[index].maxCharacters"
            outlined
            :readonly="(submittedFinal = false) || readonly"
            label="User or Customer"
          ></v-textarea>
        </validation-provider>
        <br />
        <div class="d-flex flex-row mb-3">
          <div class="d-flex justify-start mr-auto">
            <v-btn
              v-if="disabledPastDraft == 0"
              :disabled="readonly || unmakeFD == 1 || loading"
              rounded
              x-large
              outlined
              depressed
              :loading="loading"
              @click="draftSave"
              ><v-icon v-if="success == true" left color="green" :value="success == true"
                >mdi-check-bold</v-icon
              >

              <v-icon v-if="errorMsg == true" left color="red" :value="errorMsg == true"
                >mdi-close-thick</v-icon
              >

              Save Draft
            </v-btn>
          </div>

          <div class="d-flex justify-end ml-auto">
            <v-btn
              v-if="unmakeFD == 0 && adkData.valueDrafts.length > 0"
              :disabled="invalid || readonly || loading"
              x-large
              color="#fec34b"
              rounded
              class="font-weight-bold white--text"
              depressed
              :loading="loading"
              @click="finalDraft"
            >
              Make Final Draft
            </v-btn>
            <v-btn
              v-if="unmakeFD == 1"
              :disabled="invalid || readonly || loading"
              x-large
              rounded
              color="#ea6764"
              class="font-weight-bold white--text"
              depressed
              :loading="loading"
              @click="unmakeFinalDraft"
              ><v-icon color="white" left>mdi-lead-pencil</v-icon>
              Continue to Edit
            </v-btn>
          </div>
          <!-- <div><v-btn small disabled depressed>Current Version</v-btn></div>
          <div><v-btn small outlined depressed>Version 4</v-btn></div>
          <div><v-btn small outlined depressed>Version 3</v-btn></div>
          <div><v-btn small outlined depressed>Version 2</v-btn></div>
          <div><v-btn small outlined depressed>Version 1</v-btn></div> -->
        </div>
        <!-- <v-alert dense :value="unmakeFDMsg == true" type="warning"
          >You are free to continue to edit. Mark as final draft when done.</v-alert
        > -->
        <!-- <v-alert dense :value="finalDraftMsg == true" type="success"
          >Final draft has been saved.</v-alert
        > -->
        <!-- <v-alert dense :value="errorMsg == true" type="error">Draft not saved. Try again.</v-alert> -->
        <!-- <v-alert dense :value="success == true" type="success">Draft saved</v-alert> -->

        <!-- ENTER CONTENT HERE -->
        <!-- DESIGN YOUR ACTIVITY HERE / COMMENT OUT WHEN YOU'VE STARTED DESIGNING -->
        <!-- <div class="module-default__none">Design your activity here</div> -->
      </div>
    </div>
  </ValidationObserver>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from '@vue/composition-api';
import { getModAdk } from 'pcv4lib/src';
// import Swal from 'sweetalert2';
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
    userType: {
      required: true,
      type: String
      // participant: '',
      // organizer: '',
      // stakeholder: ''
    },
    teamDoc: {
      required: true,
      type: Object as PropType<MongoDoc>,
      default: () => {}
    },
    readonly: {
      required: false,
      default: false
    }
  },
  setup(props, ctx) {
    const programDoc = computed({
      get: () => props.value,
      set: newVal => {
        ctx.emit('input', newVal);
      }
    });

    const index = programDoc.value.data.adks.findIndex(function findOfferObj(obj) {
      return obj.name === 'ideate';
    });

    const initIdeateDefault = {
      valueDrafts: []
    };

    const { adkData: teamAdkData, adkIndex } = getModAdk(
      props,
      ctx.emit,
      'Ideate',
      initIdeateDefault,
      'teamDoc',
      'inputTeamDoc'
    );
    const adkData = ref(teamAdkData.value);

    if (programDoc.value.data.adks[index].maxCharacters === undefined) {
      const initIdeatePresets = {
        maxCharacters: '280',
        defaultActivity: {
          groupActivity: 'Screening',
          requiredActivity: 'Yes',
          deliverableActivity: 'No',
          endEarlyActivity: 'Yes',
          required: false
        }
      };
      programDoc.value.data.adks[index] = {
        ...initIdeatePresets,
        ...programDoc.value.data.adks[index]
      };
    }

    const disabledPastDraft = ref(0);
    const IndexVal = ref(adkData.value.valueDrafts.length);
    const problem = ref('');
    const solution = ref('');
    const innovation = ref('');
    const user = ref('');
    const finalDraftSaved = ref('Draft');
    const loading = ref(false);

    const unmakeFD = ref(0);

    if (adkData.value.valueDrafts.length > 0) {
      problem.value = adkData.value.valueDrafts[IndexVal.value - 1].problem;
      solution.value = adkData.value.valueDrafts[IndexVal.value - 1].solution;
      innovation.value = adkData.value.valueDrafts[IndexVal.value - 1].innovation;
      user.value = adkData.value.valueDrafts[IndexVal.value - 1].user;
      if (adkData.value.valueDrafts[IndexVal.value - 1].finalDraft === true) {
        disabledPastDraft.value = 1;
        unmakeFD.value = 1;
        finalDraftSaved.value = 'Final Draft';
      }
    }

    const display = ref(IndexVal.value);

    const success = ref(false);
    const errorMsg = ref(false);
    const finalDraftMsg = ref(false);
    const unmakeFDMsg = ref(false);

    // console.log(disabledPastDraft.value);

    async function draftSave() {
      loading.value = true;
      success.value = false;
      errorMsg.value = false;
      setTimeout(() => {
        loading.value = false;
        // success.value = true;
      }, 3000);
      const draftNum = adkData.value.valueDrafts.length - 1;
      const draft = ref({
        problem: problem.value,
        solution: solution.value,
        innovation: innovation.value,
        user: user.value,
        finalDraft: false
        // draftIndex: IndexVal.value + 1
        // index: ''
      });
      if (
        problem.value.length !== 0 ||
        solution.value.length !== 0 ||
        innovation.value.length !== 0 ||
        user.value.length !== 0
      ) {
        if (adkData.value.valueDrafts.length - 1 < 0) {
          adkData.value.valueDrafts.push(draft.value);
          // console.log('draft saved, first draft');
          // console.log(adkData.value.valueDrafts);
          // eslint-disable-next-line no-plusplus
          IndexVal.value++;
          // eslint-disable-next-line no-plusplus
          // display.value++;
          // console.log(display.value);
          // success.value = true;
          // Swal.fire({
          //   type: 'success',
          //   title: 'Draft saved',
          //   text: 'Nice, keep it up!',
          //   showConfirmButton: false,
          //   timer: 2500,
          //   allowOutsideClick: false
          // });
          await props.teamDoc.update();
          // loading.value = false;
          success.value = true;
          // success.value = '';
          // problem.value = '';
          // solution.value = '';
          // innovation.value = '';
          // user.value = '';
          // } else if (adkData.value.valueDrafts.length - IndexVal.value === 2) {
          //   console.log('first item');
        } else if (
          problem.value !== adkData.value.valueDrafts[draftNum].problem ||
          solution.value !== adkData.value.valueDrafts[draftNum].solution ||
          innovation.value !== adkData.value.valueDrafts[draftNum].innovation ||
          user.value !== adkData.value.valueDrafts[draftNum].user
        ) {
          adkData.value.valueDrafts.push(draft.value);
          // console.log('draft saved');
          // console.log(adkData.value.valueDrafts);

          // eslint-disable-next-line no-plusplus
          IndexVal.value++;
          // eslint-disable-next-line no-plusplus
          display.value++;
          // console.log(display.value);
          // Swal.fire({
          //   type: 'success',
          //   title: 'Draft saved!',
          //   text: 'nice, keep it up!',
          //   showConfirmButton: false,
          //   timer: 2500,
          //   allowOutsideClick: false
          // });
          await props.teamDoc.update();
          success.value = true;
        } else {
          errorMsg.value = true;
        }
      } else {
        // Swal.fire({
        //   type: 'error',
        //   title: 'Oops...',
        //   text: 'You forgot to write something in.',
        //   showConfirmButton: false,
        //   timer: 2500,
        //   allowOutsideClick: false
        //   // footer: 'asd'
        // });
        errorMsg.value = true;
      }
      // errorMsg.value = false;
      // success.value = false;
      // loading.value = false;
    }
    const indexNum = '';

    const finalDraftIndex = ref('');

    async function finalDraft() {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
        disabledPastDraft.value = 1;
        unmakeFD.value = 1;
        // success.value = true;
      }, 3000);
      const draft = ref({
        problem: problem.value,
        solution: solution.value,
        innovation: innovation.value,
        user: user.value,
        finalDraft: true
        // draftIndex: IndexVal.value + 1
        // index: ''
      });
      adkData.value.valueDrafts.push(draft.value);
      // console.log('saved final draft');

      finalDraftSaved.value = 'Final Draft';
      display.value = adkData.value.valueDrafts.length - 1;

      // console.log(display.value);
      // Swal.fire({
      //   type: 'success',
      //   title: 'Congratulations!',
      //   text:
      //     'You have marked this draft to be your final draft. If you need to make edits press the unmake final draft button.',
      //   showConfirmButton: false,
      //   timer: 2500,
      //   allowOutsideClick: false
      // });
      await props.teamDoc.update(() => ({
        isComplete: true,
        adkIndex
      }));
      // await props.teamDoc!.update();
      // loading.value = false;
      finalDraftMsg.value = true;
    }

    function showDraft(draft: number) {
      // console.log(draft);
      // IndexVal.value = draftIndex;
      // if (IndexVal.value !== draftIndex) {
      //   return draftIndex;
      //   // IndexVal.value = draftIndex;
      // }
      // console.log(adkData.value.valueDrafts[draftIndex - 1].innovation);
      // eslint-disable-next-line operator-assignment
      IndexVal.value = adkData.value.valueDrafts.length - draft;
      display.value = IndexVal.value;
      problem.value = adkData.value.valueDrafts[IndexVal.value].problem;
      solution.value = adkData.value.valueDrafts[IndexVal.value].solution;
      innovation.value = adkData.value.valueDrafts[IndexVal.value].innovation;
      user.value = adkData.value.valueDrafts[IndexVal.value].user;
      // console.log(IndexVal.value);
      console.log(adkData.value.valueDrafts[IndexVal.value].finalDraft);
      if (adkData.value.valueDrafts.length - draft !== adkData.value.valueDrafts.length - 1) {
        disabledPastDraft.value = 1;

        // console.log(disabledPastDraft.value);
      } else {
        disabledPastDraft.value = 0;
        // console.log(disabledPastDraft.value);
      }
      if (adkData.value.valueDrafts[IndexVal.value].finalDraft === true) {
        finalDraftSaved.value = 'Final Draft';
        unmakeFD.value = 1;
        disabledPastDraft.value = 1;
        // console.log('this is a final draft');
      } else {
        finalDraftSaved.value = 'Draft';
        // unmakeFD.value = 0;
      }

      return draft;
    }
    // watch: {
    //   loader () {
    //     const l = this.loader
    //     this[l] = !this[l]

    //     setTimeout(() => (this[l] = false), 3000)

    //     this.loader = null

    async function unmakeFinalDraft() {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
        unmakeFD.value = 0;
        disabledPastDraft.value = 0;
        // success.value = true;
      }, 3000);
      // console.log('unmakeFD');

      // Swal.fire({
      //   type: 'info',
      //   title: 'Unmade Final Draft',
      //   text:
      //     'Draft is unmade as final draft. You can now make changes to this draft and continue to make new ones. Remember to mark one as final draft when you are done!',
      //   showConfirmButton: false,
      //   timer: 2500,
      //   allowOutsideClick: false
      //   // footer: 'asd'
      // });

      adkData.value.valueDrafts[adkData.value.valueDrafts.length - 1].finalDraft = false;

      finalDraftSaved.value = 'Draft';

      // props.teamDoc.update(() => ({
      //   isComplete: false,
      //   adkIndex
      // }));
      await props.teamDoc!.update();
      // loading.value = false;
      unmakeFDMsg.value = true;
    }

    const setupInstructions = ref({
      description: '',
      instructions: ['', '', '']
    });

    return {
      status: 'true',
      setupInstructions,
      showInstructions: 'true',
      draftSave,
      IndexVal,
      finalDraft,
      showDraft,
      finalDraftSaved,
      indexNum,
      finalDraftIndex,
      display,
      adkData,
      success,
      problem,
      solution,
      innovation,
      user,
      programDoc,
      index,
      disabledPastDraft,
      unmakeFD,
      unmakeFinalDraft,
      loading,
      errorMsg,
      finalDraftMsg,
      unmakeFDMsg
    };
  }
});
</script>

<style lang="scss">
.swal2-styled.swal2-confirm {
  background-color: #404142;
}
.v-menu__content {
  box-shadow: none;
}

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

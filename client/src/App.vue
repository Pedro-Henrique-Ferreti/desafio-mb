<template>
  <main class="container-small">
    <form
      class="form"
      @submit.prevent
    >
      <RegisterFormWelcome
        v-if="activeFormStep === FormSteps.WELCOME"
        v-model:email="form.email"
        @next="activeFormStep = FormSteps.PERSON"
      />
      <RegisterFormPerson
        v-else-if="activeFormStep === FormSteps.PERSON"
        v-model:name="form.name"
        v-model:document-id="form.documentId"
        v-model:birthdate="form.birthdate"
        v-model:phone-number="form.phoneNumber"
        :is-company="form.isCompany"
        @previous="activeFormStep = FormSteps.WELCOME"
        @next="activeFormStep = FormSteps.PASSWORD"
      />
      <RegisterFormPassword
        v-else-if="activeFormStep === FormSteps.PASSWORD"
        v-model:password="form.password"
        @previous="activeFormStep = FormSteps.PERSON"
        @next="activeFormStep = FormSteps.REVIEW"
      />
      <RegisterFormReview
        v-else-if="activeFormStep === FormSteps.REVIEW"
        v-model:email="form.email"
        v-model:name="form.name"
        v-model:document-id="form.documentId"
        v-model:birthdate="form.birthdate"
        v-model:phone-number="form.phoneNumber"
        v-model:password="form.password"
        :is-company="form.isCompany"
        @previous="activeFormStep = FormSteps.PASSWORD"
      />
    </form>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import RegisterFormWelcome from './components/RegisterFormWelcome.vue';
import RegisterFormPerson from './components/RegisterFormPerson.vue';
import RegisterFormPassword from './components/RegisterFormPassword.vue';
import RegisterFormReview from './components/RegisterFormReview.vue';

const FormSteps = {
  WELCOME: 1,
  PERSON: 2,
  PASSWORD: 3,
  REVIEW: 4,
};

const activeFormStep = ref(FormSteps.WELCOME);

const form = ref({
  name: '',
  email: '',
  documentId: '',
  birthdate: '',
  phoneNumber: '',
  password: '',
  isCompany: false,
});
</script>

<style lang="scss" scoped>
.form {
  margin-top: 3rem;
}
</style>

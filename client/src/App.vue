<template>
  <main class="container-small">
    <form
      class="form"
      @submit.prevent
    >
      <RegisterFormWelcome
        v-if="activeFormStep === FormSteps.WELCOME"
        v-model:email="form.email"
        v-model:register-type="form.registerType"
        @next="activeFormStep = FormSteps.PERSON"
      />
      <RegisterFormPerson
        v-else-if="activeFormStep === FormSteps.PERSON"
        v-model:name="form.name"
        v-model:document-id="form.documentId"
        v-model:birthdate="form.birthdate"
        v-model:phone-number="form.phoneNumber"
        :is-company="form.registerType === RegisterType.COMPANY"
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
        :is-loading="isLoading"
        :is-company="form.registerType === RegisterType.COMPANY"
        @previous="activeFormStep = FormSteps.PASSWORD"
        @submit-form="submitForm"
      />
    </form>
  </main>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useToast } from 'vue-toastification';
import { RegisterType } from './constants/register';
import RegisterFormWelcome from './components/RegisterFormWelcome.vue';
import RegisterFormPerson from './components/RegisterFormPerson.vue';
import RegisterFormPassword from './components/RegisterFormPassword.vue';
import RegisterFormReview from './components/RegisterFormReview.vue';

const toast = useToast();

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
  registerType: RegisterType.PERSON,
});

watch(() => form.value.registerType, () => {
  form.value.documentId = '';
});

// Submit form
const isLoading = ref(false);

async function submitForm() {
  isLoading.value = true;

  try {
    await fetch('http://localhost:3000/registration', {
      method: 'POST',
      body: JSON.stringify(form.value),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    toast.success('Cadastro realizado com sucesso!');
  } catch (error) { // eslint-disable-line
    toast.error('Falha ao realizar o cadastro. Por favor, tente novamente.');
  } finally {
    isLoading.value = false;
  }
}
</script>

<style lang="scss" scoped>
.form {
  max-width: 20rem;
  padding: 3rem 0;
  margin: auto;
}
</style>

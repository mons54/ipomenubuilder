<template>
  <div>
    <b-form-checkbox
      id="inline"
      v-model="menuTranslate.inline">
      Traduction sur la même carte
    </b-form-checkbox>
    <div class="mt-3">
      <label for="defaultLanguage">Langue par défaut</label>
      <b-form-select
        v-model="defaultLanguage"
        :options="allLanguages"
        id="defaultLanguage"
      />
    </div>
    <div
      v-for="(language, key) of menuTranslate.translation"
      :key="key"
      class="mt-3 d-flex">
      <b-form-select
        v-model="menuTranslate.translation[key]"
        @change.native="event => {
          addTranslation(event.target.value)
        }"
        :options="translationLanguages(language)"
      />
      <b-button
        @click="deleteTranslation(key)"
        variant="light"
        class="ml-3"
        size="sm">
        <b-icon-trash/>
      </b-button>
      <b-button
        @click="upTranslation(key)"
        variant="light"
        class="ml-3"
        size="sm"
        :disabled="!key">
        <b-icon-caret-up-fill/>
      </b-button>
      <b-button
        @click="downTranslation(key)"
        variant="light"
        class="ml-3"
        size="sm"
        :disabled="key === menuTranslate.translation.length - 1">
        <b-icon-caret-down-fill/>
      </b-button>
    </div>
    <b-form-select
      v-if="availableLanguages.length > 1"
      @change="addLanguage"
      v-model="addLanguageModel"
      :options="availableLanguages"
      class="mt-3"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapMutations, mapState } from 'vuex'
import translate from '@/api/translate'

export default {
  data() {
    return {
      addLanguageModel: null
    }
  },
  computed: {
    ...mapState({
      pages: state => state.menu.data.pages,
      menuTranslate: state => state.menu.data.translate,
      languages: state => state.translate.languages,
    }),
    defaultLanguage: {
      get() {
        return this.menuTranslate.language
      },
      set(language) {
        this.menuTranslate.language = language
        this.menuTranslate.translation = []
      },
    },
    allLanguages() {
      const languages = []
      for (const value of this.languages)
        languages.push({ value: value.language, text: value.name })
      return languages
    },
    availableLanguages() {
      return [
        ...[{ value: null, text: 'Ajouter une langue' }],
        ...this.allLanguages.filter(language =>
          language.value !== this.defaultLanguage &&
          !this.menuTranslate.translation.includes(language.value)
        )
      ]
    },
    dishes() {
      let dishes = []
      for (const page of this.pages) {
        for (const element of page.elements) {
          if (element.type !== 'dish')
            continue
          dishes = [
            ...dishes,
            ...element.items,
          ]
        }

      }
      return dishes
    }
  },
  methods: {
    ...mapActions('translate', [
      'getLanguages',
    ]),
    ...mapMutations('history', [
      'breakHistory',
    ]),
    translationLanguages(value) {
      return this.allLanguages.filter(language =>
        language.value !== this.defaultLanguage &&
        (
          !this.menuTranslate.translation.includes(language.value) ||
          language.value === value
        )
      )
    },
    addLanguage(language) {

      this.menuTranslate.translation.push(language)
      this.addLanguageModel = null

      this.addTranslation(language)
    },
    async addTranslation(language) {

      const texts = []

      this.dishes.forEach(dish => {
        texts.push(dish.description)
      })

      const { data } = await translate.translate(language, texts)

      this.dishes.forEach((dish, key) => {
        Vue.set(dish.translation, language, data.translation[key])
      })
    },
    deleteTranslation(key) {
      this.menuTranslate.translation.splice(key, 1)
    },
    upTranslation(key) {
      const translation = this.menuTranslate.translation
      const language = translation[key]
      Vue.set(translation, key, translation[key - 1])
      Vue.set(translation, key - 1, language)
    },
    downTranslation(key) {
      const translation = this.menuTranslate.translation
      const language = translation[key]
      Vue.set(translation, key, translation[key + 1])
      Vue.set(translation, key + 1, language)
    },
  },
  created() {
    this.getLanguages()
  }
}
</script>

<style lang="scss" scoped>
</style>

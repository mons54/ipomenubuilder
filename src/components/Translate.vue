<template>
  <div>
    <label for="defaultLanguage">Langue par défaut</label>
    <b-form-select
      v-model="defaultLanguage"
      :options="languagesOptions"
      id="defaultLanguage"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import translate from '@/api/translate'

export default {
  computed: {
    ...mapState({
      translate: state => state.menu.data.translate,
      languages: state => state.translate.languages,
    }),
    defaultLanguage: {
      get() {
        return this.translate.language
      },
      set(language) {
        this.breakHistory()
        this.translate.language = language
      },
    },
    languagesOptions() {
      const languages = []
      for (const value of this.languages)
        languages.push({ value: value.language, text: value.name })
      return languages
    },
  },
  methods: {
    ...mapActions('translate', [
      'getLanguages',
    ]),
    ...mapMutations('history', [
      'breakHistory',
    ]),
    translate(text) {
      return translate.translate(text)
    },
  },
  created() {
    this.getLanguages()
  }
}
</script>

<style lang="scss" scoped>
</style>

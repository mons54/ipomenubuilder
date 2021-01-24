<template>
  <div>
    <b-form-checkbox
      id="inline"
      v-model="menuTranslate.inline"
      @change="setMenuTranslation(null)">
      Traduction sur la même carte
    </b-form-checkbox>
    <b-form-checkbox
      id="dishName"
      v-model="menuTranslate.dishName">
      Traduire les titres de plats
    </b-form-checkbox>
    <b-form-checkbox
      v-if="!menuTranslate.inline"
      id="textes"
      v-model="menuTranslate.textes">
      Traduire les textes
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
    <div class="translation mt-3">
      <b-card
        no-body
        class="mb-1"
        bg-variant="transparent">
        <b-card-header class="p-1">
          <b-button
            block
            v-b-toggle.accordion-dishes>
            Plats
          </b-button>
        </b-card-header>
        <b-collapse id="accordion-dishes">
          <b-card-body>
            <b-card-text>
              <b-form-group v-slot="{ ariaDescribedby }">
                <b-form-checkbox-group
                  id="dishes-group"
                  v-model="dishesSelected"
                  :options="dishesOptions"
                  :aria-describedby="ariaDescribedby"
                  name="dishes"
                ></b-form-checkbox-group>
              </b-form-group>
            </b-card-text>
            <b-button
              class="mr-3"
              variant="success"
              @click="setDishes">
              Traduire
            </b-button>
            <b-button
              v-if="dishesSelected.length !== dishesOptions.length"
              variant="primary"
              @click="selectAllDishes">
              Sélectionner
            </b-button>
            <b-button
              v-else
              variant="secondary"
              @click="dishesSelected = []">
              Désélectionner
            </b-button>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card
        no-body
        class="mb-1"
        bg-variant="transparent">
        <b-card-header class="p-1">
          <b-button
            block
            v-b-toggle.accordion-textes>
            Texts
          </b-button>
        </b-card-header>
        <b-collapse id="accordion-textes">
          <b-card-body>
            <b-card-text>
              <b-form-group v-slot="{ ariaDescribedby }">
                <b-form-checkbox-group
                  id="textes-group"
                  v-model="textesSelected"
                  :options="textesOptions"
                  :aria-describedby="ariaDescribedby"
                  name="textes"
                ></b-form-checkbox-group>
              </b-form-group>
            </b-card-text>
            <b-button
              class="mr-3"
              variant="success"
              @click="setTextes">
              Traduire
            </b-button>
            <b-button
              v-if="textesSelected.length !== textesOptions.length"
              variant="primary"
              @click="selectAllTextes">
              Tout sélectionner
            </b-button>
            <b-button
              v-else
              variant="secondary"
              @click="textesSelected = []">
              Désélectionner
            </b-button>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapMutations, mapState } from 'vuex'
import translate from '@/api/translate'

export default {
  data() {
    return {
      addLanguageModel: null,
      dishesSelected: [],
      textesSelected: [],
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
    },
    dishesOptions() {
      const options = []
      this.dishes.forEach((dish, key) => {
        options.push({
          text: dish.name,
          value: {
            key,
            type: 'name',
          },
        })
        options.push({
          text: dish.description,
          value: {
            key,
            type: 'description',
          },
        })
      })
      return options
    },
    textes() {
      let textes = []
      for (const page of this.pages) {
        for (const element of page.elements) {
          if (element.type !== 'text')
            continue
          textes = [
            ...textes,
            ...element.elements,
          ]
        }

      }
      return textes
    },
    textesOptions() {
      const options = []
      this.textes.forEach((text, key) => {
        options.push({
          text: text.value,
          value: key,
        })
      })
      return options
    },
  },
  methods: {
    ...mapActions('translate', [
      'getLanguages',
    ]),
    ...mapMutations('history', [
      'breakHistory',
    ]),
    ...mapMutations('menu', [
      'setMenuTranslation',
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
    addTranslation(language) {

      this.translateDishes(language)
      this.translateTextes(language)

      if (!this.menuTranslate.inline)
        this.setMenuTranslation(language)
    },
    setDishes() {
      this.menuTranslate.translation.forEach(language => {
        this.translateDishes(language)
      })
    },
    async translateDishes(language) {

      if (!this.dishesSelected.length)
        return

      const filterName = []
      const filterDescription = []

      this.dishesSelected.forEach(({ key, type }) => {
        if (type === 'name')
          filterName.push(key)
        else
          filterDescription.push(key)
      })

      const name = []

      this.dishes.forEach((dish, key) => {
        if (filterName.includes(key))
          name.push(dish.name)
      })

      const translationName = await translate.translate(language, name)

      let key = 0

      this.dishes.forEach(dish => {
        if (!filterName.includes(key))
          return
        Vue.set(dish.translationName, language, translationName.data.translation[key])
        key++
      })

      const description = []

      this.dishes.forEach((dish, key) => {
        if (filterDescription.includes(key))
          description.push(dish.description)
      })

      const translationDescription = await translate.translate(language, description)

      key = 0

      this.dishes.forEach(dish => {
        if (!filterDescription.includes(key))
          return
        Vue.set(dish.translationDescription, language, translationDescription.data.translation[key])
        key++
      })
    },
    setTextes() {
      this.menuTranslate.translation.forEach(language => {
        this.translateTextes(language)
      })
    },
    async translateTextes(language) {

      if (!this.textesSelected.length)
        return

      const filter = []

      this.textesSelected.forEach(key => {
        filter.push(key)
      })

      const textes = []

      this.textes.forEach((text, key) => {
        if (filter.includes(key))
          textes.push(text.value)
      })

      const translation = await translate.translate(language, textes)

      let key = 0

      this.textes.forEach(text => {
        if (!filter.includes(key))
          return
        Vue.set(text.translation, language, translation.data.translation[key])
        key++
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
    selectAllDishes() {
      this.dishesSelected = []
      this.dishesOptions.forEach(item => {
        this.dishesSelected.push(item.value)
      })
    },
    selectAllTextes() {
      this.textesSelected = []
      this.textesOptions.forEach(item => {
        this.textesSelected.push(item.value)
      })
    },
  },
  created() {
    this.getLanguages()
    this.selectAllDishes()
    this.selectAllTextes()
  }
}
</script>

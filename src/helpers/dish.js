export const gridsDish = [
  {
    template: {
      display: 'grid',
      breakInside: 'avoid-column',
      gridTemplateAreas: '"name price" "description description"',
      gridTemplateColumns: '1fr auto',
      alignItems: 'baseline',
      textAlign: 'left',
    },
    prices: {
      textAlign: 'right',
    },
  },
  {
    template: {
      display: 'grid',
      breakInside: 'avoid-column',
      gridTemplateAreas: '"name price" "description auto"',
      gridTemplateColumns: '1fr auto',
      alignItems: 'baseline',
      textAlign: 'left',
    },
    prices: {
      textAlign: 'right',
    },
  },
  {
    template: {
      display: 'grid',
      breakInside: 'avoid-column',
      gridTemplateAreas: '"name name" "description price"',
      gridTemplateColumns: '1fr auto',
      alignItems: 'baseline',
      textAlign: 'left',
    },
    prices: {
      textAlign: 'right',
    },
  },
  {
    template: {
      textAlign: 'left',
    },
    name: {
      display: 'inline-flex',
    },
    prices: {
      display: 'inline-flex',
      textAlign: 'right',
    },
  },
  {
    template: {
      textAlign: 'center',
    },
    name: {
      display: 'inline-flex',
    },
    prices: {
      display: 'inline-flex',
    },
  },
  {
    template: {
      textAlign: 'right',
    },
    name: {
      display: 'inline-flex',
    },
    prices: {
      display: 'inline-flex',
    },
  },
  {
    template: {
      display: 'grid',
      breakInside: 'avoid-column',
      gridTemplateAreas: '"name" "description" "price"',
      gridTemplateColumns: '1fr',
      textAlign: 'center',
    },
    name: {
      justifyContent: 'center',
    },
    prices: {
      justifyContent: 'center',
    },
  },
  {
    template: {
      display: 'grid',
      breakInside: 'avoid-column',
      gridTemplateAreas: '"name" "description" "price"',
      gridTemplateColumns: '1fr',
      textAlign: 'left',
    },
    name: {
      justifyContent: 'flex-start',
    },
    prices: {
      justifyContent: 'flex-start',
    },
  },
  {
    template: {
      display: 'grid',
      breakInside: 'avoid-column',
      gridTemplateAreas: '"name" "description" "price"',
      gridTemplateColumns: '1fr',
      textAlign: 'right',
    },
    name: {
      justifyContent: 'flex-end',
    },
    prices: {
      justifyContent: 'flex-end',
    },
  },
]

const grid = gridsDish[0]

export const dishes = [
  {
    styleItem: {
      marginBottom: '8px',
      lineHeight: 1.5,
    },
    styleName: {
      gridArea: 'name',
      fontFamily: '"Roboto"',
      fontSize: '13px',
      lineHeight: 1.5,
    },
    styleDescription: {
      gridArea: 'description',
      fontFamily: '"Open Sans"',
      fontSize: '11px',
    },
    stylePrice: {
      gridArea: 'price',
      fontFamily: '"Open Sans"',
      fontSize: '12px',
    },
    styleAllergen: {
      width: '16px',
    },
    priceWidth: 48,
    grid,
    items: [
      {
        name: "Thai Lime Prawn Soup",
        description: "With lemongrass, kafir lime leaves & spring onions",
        prices: ['5.75'],
        translationName: {},
        translationDescription: {},
        allergens: [],
      },
      {
        name: "Cream of Wild Mushroom",
        description: "With three varieties of fresh wild mushrooms",
        prices: ['4.25'],
        translationName: {},
        translationDescription: {},
        allergens: [],
      },
      {
        name: "French Onion",
        description: "Beef broth, caramelized onion, crostini with mozzarella",
        prices: ['5.00'],
        translationName: {},
        translationDescription: {},
        allergens: [],
      },
      {
        name: "Carrot Apple Ginger",
        description: "Savory puree with crostini & parsley",
        prices: ['4.25'],
        translationName: {},
        translationDescription: {},
        allergens: [],
      },
      {
        name: "Potato Leek",
        description: "Creamy soup with carrots, celery & leeks",
        prices: ['4.25'],
        translationName: {},
        translationDescription: {},
        allergens: [],
      }
    ]
  },
]

export const itemType = {
  name: "Nom du plat",
  description: "Description du plat",
  prices: ['9.99'],
  translationName: {},
  translationDescription: {},
  allergens: [],
}

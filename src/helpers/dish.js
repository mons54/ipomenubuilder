const marginItem = '0.4em'

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
    price: {
      marginLeft: marginItem,
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
    price: {
      marginLeft: marginItem,
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
    price: {
      marginLeft: marginItem,
    },
  },
  {
    template: {
      textAlign: 'left',
    },
    name: {
      display: 'inline-flex',
    },
    price: {
      display: 'inline-flex',
      marginLeft: marginItem,
    },
  },
  {
    template: {
      textAlign: 'center',
    },
    name: {
      display: 'inline-flex',
    },
    price: {
      display: 'inline-flex',
      marginLeft: marginItem,
    },
  },
  {
    template: {
      textAlign: 'right',
    },
    name: {
      display: 'inline-flex',
    },
    price: {
      display: 'inline-flex',
      marginLeft: marginItem,
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
  },
  {
    template: {
      display: 'grid',
      breakInside: 'avoid-column',
      gridTemplateAreas: '"name" "description" "price"',
      gridTemplateColumns: '1fr',
      textAlign: 'left',
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
    grid,
    items: [
      {
        name: "Thai Lime Prawn Soup",
        description: "With lemongrass, kafir lime leaves & spring onions",
        prices: ['5.75'],
      },
      {
        name: "Cream of Wild Mushroom",
        description: "With three varieties of fresh wild mushrooms",
        prices: ['4.25'],
      },
      {
        name: "French Onion",
        description: "Beef broth, caramelized onion, crostini with mozzarella",
        prices: ['5.00'],
      },
      {
        name: "Carrot Apple Ginger",
        description: "Savory puree with crostini & parsley",
        prices: ['4.25'],
      },
      {
        name: "Potato Leek",
        description: "Creamy soup with carrots, celery & leeks",
        prices: ['4.25'],
      }
    ]
  },
]

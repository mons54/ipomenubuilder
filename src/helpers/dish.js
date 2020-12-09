export const dishes = [
  {
    styleItem: {
      display: 'grid',
      breakInside: 'avoid-column',
      gridTemplateAreas: '"name price" "description description"',
      gridTemplateColumns: '1fr auto',
      alignItems: 'baseline',
      textAlign: 'left',
      margin: '0 0 8px',
    },
    styleName: {
      gridArea: 'name',
      fontFamily: 'Roboto',
      fontSize: '13px',
    },
    styleDescription: {
      gridArea: 'description',
      fontFamily: 'Open Sans',
      fontSize: '11px',
    },
    stylePrice: {
      gridArea: 'price',
      fontFamily: 'Open Sans',
      fontSize: '12px',
    },
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

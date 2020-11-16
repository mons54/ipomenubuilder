export function getAreas (areas) {
  areas = areas.trim().replace(/"/g, '').split(' ')
  return areas.filter((area, index) =>
    areas.indexOf(area) === index
  )
}

export const grids = [
  {
    gridTemplateAreas: '"main"',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr',
  },
  {
    gridTemplateAreas: '"title" "main"',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '0.5fr 1fr',
  },
  {
    gridTemplateAreas: '"title main"',
    gridTemplateColumns: '0.75fr 1fr',
    gridTemplateRows: '1fr',
  },
  {
    gridTemplateAreas: '"main title"',
    gridTemplateColumns: '1fr 0.75fr',
    gridTemplateRows: '1fr',
  },
  {
    gridTemplateAreas: '"title area" "main area" "main area"',
    gridTemplateColumns: '1fr 0.75fr',
    gridTemplateRows: '1fr 1fr 1fr',
  },
  {
    gridTemplateAreas: '"area title" "area main" "area main"',
    gridTemplateColumns: '0.75fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr',
  },
  {
    gridTemplateAreas: '"title area" "title area" "main area" "main area1" "main area1" "main area1"',
    gridTemplateColumns: '1fr 0.75fr',
    gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr',
  },
  {
    gridTemplateAreas: '"area title" "area title" "area main" "area1 main" "area1 main" "area1 main"',
    gridTemplateColumns: '0.75fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr 1fr 1fr 1fr',
  },
  {
    gridTemplateAreas: '"title main" "area main"',
    gridTemplateColumns: '0.75fr 1fr',
    gridTemplateRows: '0.5fr 1fr',
  },
  {
    gridTemplateAreas: '"main title" "main area"',
    gridTemplateColumns: '1fr 0.75fr',
    gridTemplateRows: '0.5fr 1fr',
  },
  {
    gridTemplateAreas: '"main area" "main title"',
    gridTemplateColumns: '1fr 0.75fr',
    gridTemplateRows: '1fr 0.5fr',
  },
  {
    gridTemplateAreas: '"area main" "title main"',
    gridTemplateColumns: '0.75fr 1fr',
    gridTemplateRows: '1fr 0.5fr',
  },
  {
    gridTemplateAreas: '"title title" "area area1" "area2 main"',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '0.75fr 1fr 1fr',
  },
  {
    gridTemplateAreas: '"title area" "area1 main"',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr',
  },
  {
    gridTemplateAreas: '"title area" "main main"',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '0.5fr 1fr',
  },
  {
    gridTemplateAreas: '"main main" "title area"',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 0.5fr',
  },
  {
    gridTemplateAreas: '"title area" "main area" "main area1" "main area1"',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 0.5fr 0.5fr 1fr',
  },
  {
    gridTemplateAreas: '"area title" "area main" "area1 main" "area1 main"',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 0.5fr 0.5fr 1fr',
  },
  {
    gridTemplateAreas: '"title title area" "area1 main main"',
    gridTemplateColumns: '1fr 0.5fr 1fr',
    gridTemplateRows: '1fr 1fr',
  },
  {
    gridTemplateAreas: '"area title title" "main main area1"',
    gridTemplateColumns: '1fr 0.5fr 1fr',
    gridTemplateRows: '1fr 1fr',
  },
  {
    gridTemplateAreas: '"title" "main" "area"',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '0.75fr 1fr 0.75fr',
  },
  {
    gridTemplateAreas: '"title main area" "title main area" "title main area"',
    gridTemplateColumns: '0.75fr 1fr 0.75fr',
    gridTemplateRows: '1fr 1fr 1fr',
  },
  {
    gridTemplateAreas: '"title main" "area main" "area1 main"',
    gridTemplateColumns: '0.75fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr',
  },
  {
    gridTemplateAreas: '"main title" "main area" "main area1"',
    gridTemplateColumns: '1fr 0.75fr',
    gridTemplateRows: '1fr 1fr 1fr',
  },
  {
    gridTemplateAreas: '"area title" "area1 main" "area2 main"',
    gridTemplateColumns: '0.75fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr',
  },
  {
    gridTemplateAreas: '"title area" "main area1" "main area2"',
    gridTemplateColumns: '1fr 0.75fr',
    gridTemplateRows: '1fr 1fr 1fr',
  },
  {
    gridTemplateAreas: '"title title" "area main" "area1 main" "area2 main"',
    gridTemplateColumns: '0.75fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr 1fr',
  },
  {
    gridTemplateAreas: '"title title" "main area" "main area1" "main area2"',
    gridTemplateColumns: '1fr 0.75fr',
    gridTemplateRows: '1fr 1fr 1fr 1fr',
  },
  {
    gridTemplateAreas: '"title main" "area main" "area1 main" "area2 main"',
    gridTemplateColumns: '0.75fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr 1fr',
  },
  {
    gridTemplateAreas: '"main title" "main area" "main area1" "main area2"',
    gridTemplateColumns: '1fr 0.75fr',
    gridTemplateRows: '1fr 1fr 1fr 1fr',
  },
  {
    gridTemplateAreas: '"title area area1" "main main main"',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: '0.5fr 1fr',
  },
  {
    gridTemplateAreas: '"main main main" "title area area1"',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: '1fr 0.5fr',
  },
  {
    gridTemplateAreas: '"title area area1 area2" "main main main main"',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridTemplateRows: '0.5fr 1fr',
  },
  {
    gridTemplateAreas: '"main main main main" "title area area1 area2"',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridTemplateRows: '1fr 0.5fr',
  },
  {
    gridTemplateAreas: '"title title title" "main main main" "area area1 area2"',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: '0.75fr 1fr 0.75fr',
  },
  {
    gridTemplateAreas: '"area area1 area2" "main main main" "title title title"',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: '0.75fr 1fr 0.75fr',
  },
  {
    gridTemplateAreas: '"title title title" "main main main" "area1 area2 area3" "area area area"',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: '0.5fr 1fr 0.75fr 0.5fr',
  },
  {
    gridTemplateAreas: '"title title title" "area1 area2 area3" "main main main" "area area area"',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: '0.5fr 0.75fr 1fr 0.5fr',
  },
  {
    gridTemplateAreas: '"title area" "main area1" "main area2"',
    gridTemplateColumns: '1fr 0.75fr',
    gridTemplateRows: '1fr 1fr 1fr',
  },
  {
    gridTemplateAreas: '"area title" "area1 main" "area2 main"',
    gridTemplateColumns: '0.75fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr',
  },
  {
    gridTemplateAreas: '"title area" "title area1" "main area2" "main area3"',
    gridTemplateColumns: '1fr 0.5fr',
    gridTemplateRows: '1fr 1fr 1fr 1fr',
  },
  {
    gridTemplateAreas: '"area title" "area1 title" "area2 main" "area3 main"',
    gridTemplateColumns: '0.5fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr 1fr',
  },
  {
    gridTemplateAreas: '"title area" "title area1" "main area2" "main area3" "main area4"',
    gridTemplateColumns: '1fr 0.5fr',
    gridTemplateRows: '1fr 1fr 1fr 1fr 1fr',
  },
  {
    gridTemplateAreas: '"area title" "area1 title" "area2 main" "area3 main" "area4 main"',
    gridTemplateColumns: '0.5fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr 1fr 1fr',
  },
]

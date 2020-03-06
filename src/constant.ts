import {TController} from './types';

export const TabItem = [
  {
    id: 1,
    text: 'Info'
  },
  {
    id: 2,
    text: 'Game'
  },
  {
    id: 3,
    text: 'World'
  },
  {
    id: 4,
    text: 'Level'
  },
  {
    id: 5,
    text: 'Resource'
  },
  // {
  //   id: 6,
  //   text: 'Event'
  // },
  // {
  //   id: 7,
  //   text: 'Player'
  // },
  {
    id: 8,
    text: 'Render'
  }
];

export const treeData = [
  {
    id: 1,
    text: 'Node1',
    type: 'type1',

    children: [
      {
        id: 2,
        text: 'Node2',
        type: 'type2',
        children: [
          {
            id: 5,
            text: 'Node5',
            type: 'camera'
          }
        ]
      },
      {
        id: 3,
        text: 'Node3',
        type: 'type3',
        children: [
          {
            id: 7,
            text: 'Node7',
            type: 'type7',
            children: [
              {
                id: 8,
                text: 'Node8',
                type: 'image'
              }
            ]
          }
        ]
      },
      {
        id: 4,
        text: 'Node4'
      }
    ]
  },
  {
    id: 6,
    text: 'Node6',
    type: 'light'
  },
  {
    id: 9,
    text: 'Node9',
    type: 'component'
  },
  {
    id: 10,
    text: 'Node10',
    type: 'game'
  },
  {
    id: 11,
    text: 'Node11',
    type: 'actor'
  },
  {
    id: 12,
    text: 'Node12',
    type: 'world'
  },
  {
    id: 13,
    text: 'Node13',
    type: 'scenes'
  }
];

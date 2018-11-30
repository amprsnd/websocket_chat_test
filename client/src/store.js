export default {
  server: 'ws://localhost:3000',
  ws: null,
  userName: '',
  usersList: [],
  history: [],
  message: {
    type: '', // new update message
    name: '',
    text: ''
  },
  scroll: {
    rail: {
      background: '#777',
      opacity: 0.3,
      size: '6px',
      specifyBorderRadius: false,
      gutterOfEnds: '2px',
      gutterOfSide: '2px',
      keepShow: false
    },
    bar: {
      showDelay: 500,
      onlyShowBarOnScroll: true,
      keepShow: false,
      background: '#777',
      opacity: 1,
      hoverStyle: false,
      specifyBorderRadius: false
    }
  }
}

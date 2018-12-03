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
      background: '#fff',
      opacity: 0.5,
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
      background: '#84CEEB',
      opacity: 1,
      hoverStyle: false,
      specifyBorderRadius: false
    }
  },
  mobileUsers: false,
  mobileMessage: false
}

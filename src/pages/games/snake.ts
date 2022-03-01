import '@/assets/scss/pages/2048.scss'

function init() {
  
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    init()
  })
} else {
  init()
}

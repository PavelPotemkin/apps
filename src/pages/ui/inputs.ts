import '@/assets/scss/pages/ui.scss'

function init() {
  console.log('123')
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    init()
  })
} else {
  init()
}
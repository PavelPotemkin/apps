function f() {
  let i = 0
  
  return function () {
    i += 1
  }
}

let ww = f()

ww()
ww()



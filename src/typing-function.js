function compareSpans () {
  const promptDiv = document.querySelector(".prompt-div")
  let correctCounter = 0
  let incorrectCounter = 0
  let spanCount = promptDiv.querySelectorAll('span').length
  for (let i = 0; i < spanCount; i++) {
    // let firstPromptWord = document.querySelector('#prompt-0').innerText
    // firstPromptWord.style.color = 'magenta'
    let promptWord = document.querySelector(`#prompt-${i}`).innerText
    let userWord = document.querySelector(`#word-${i}`).innerText
    const nextWord = document.querySelector(`#prompt-${i}`)
    console.log("promptword:", promptWord)
    console.log("userword:", userWord)

    nextWord.style.color = 'gray'
    if (promptWord === userWord) {
      ++correctCounter
      console.log(`correct: ${correctCounter}`)
    }
    else {
      nextWord.style.color = 'red'
      ++incorrectCounter
      console.log(`incorrect: ${incorrectCounter}`)
    }
    const highlighted = document.querySelector(`#prompt-${i + 1}`)
    highlighted.style.color = 'blue'
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const promptDiv = document.querySelector(".prompt-div")
  fetchMainPrompt()


  function fetchMainPrompt() {
  fetch('http://localhost:3000/prompts')
  .then(res => res.json())
  .then(putPromptOnPage)
  }

  function putPromptOnPage (prompts) {
    let randomPrompt = prompts[Math.floor(Math.random()*prompts.length)];
    const p = document.createElement('p')
    p.innerText = randomPrompt.content
    promptDiv.append(p)
    let spaces = randomPrompt.content.split(" ")
    spaces.forEach (function(word) {

      let punctuationSplit = word.split("[.,!?:;’\“-]+\\s*")

        })
    })
}
})

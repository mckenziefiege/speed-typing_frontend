document.addEventListener('DOMContentLoaded', () => {
  let currentUser = null
  const promptDiv = document.querySelector(".prompt-div")
  const gameDiv = document.querySelector('.game-div')
  let correctP = document.querySelector('.correct-number')
  let incorrectP = document.querySelector('.incorrect-number')
  let timerDiv = document.querySelector('#safeTimerDisplay')
  let modal = document.querySelector('.modal')
  let modalContent = document.querySelector('.modal-content')
  const playAgainButton = document.querySelector('.play-again')
  let userTextbox = document.getElementById('user-textbox')

  playAgainButton.addEventListener('click', reloadPage)

  const startGameButton = document.querySelector('#start-game-button'); // User 'login'
  let modalShow = true; //show modal in beginning
  gameDiv.style.display = 'none';
  startGameButton.addEventListener('click', () => {
    modalShow = !modalShow;
    if (modalShow) {
      modalContent.style.display = 'block';
      modalContent.addEventListener('click', () => {
      })
    } else {
      modalContent.style.display = 'none';
      gameDiv.style.display = 'block';
      postUserToDatabase ()
      fetchMainPrompt()
        .then(compareSpans)
      // takeUserInput(event)
    }
  });
  // Adds new user to database
  function postUserToDatabase () {
    fetch('http://localhost:3000/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "username": username.value
      })
    }).then(res => res.json())
    .then(user => createUserId(user))
  }

  function createUserId(user) {
    currentUser = user.id
    console.log(currentUser)
  }

  // Takes User input from 'form'. Has getUserIdFromDatabase and filterUsers
  // Also fetches main prompt
  function takeUserInput (event) {
    // const username = event.target.parentElement.querySelector('#username').value
    const difficultyLevel = event.target.parentElement.querySelector('#difficulty').value

    // function getUserIdFromDatabase () {
    //   fetch('http://localhost:3000/users')
    //     .then(res => res.json())
    //     .then(filterUsers)
    // }

    // function filterUsers (users) {
    //   let chosenUser = users.filter(user => user.username === username)
    //   const p = document.createElement('p')
    //   p.className = "the-user-we-need"
    //   p.id = chosenUser[0].id
    //   promptDiv.append(p)
    //   currentUser = chosenUser
    // }
    //
    // getUserIdFromDatabase()

    }


  // Fetches the prompt and calls putPromptOnPage
  function fetchMainPrompt () {
  return fetch('http://localhost:3000/prompts')
  .then(res => res.json())
  .then(putPromptOnPage)
  }

  // randomly selects prompt and creates spans for each prompt word
  function putPromptOnPage (prompts) {
    const filteredPrompts = prompts.filter(prompt => prompt.difficulty === `${difficulty.value}`)
    let randomPrompt = filteredPrompts[Math.floor(Math.random()*filteredPrompts.length)];
    const p = document.createElement('p')
    let spaces = randomPrompt.content.replace( /\n/g, ' ').split(' ')
    let arrayOfWords = spaces.filter(word => word !== "")
    let count = arrayOfWords.length
    for (let i = 0; i < count; i++) {
      let span = document.createElement('span')
      span.id = `prompt-${i}`
      span.innerText = `${arrayOfWords[i]}`
      p.append(span)
    }
    promptDiv.append(p)
  }

  // User starts typing, timer starts and user words go into spans
  userTextbox.addEventListener('focus', timer)
  userTextbox.addEventListener('keydown', function (event) {
    if (event.keyCode == 32) {
      event.target.innerHTML = wrapWords(this.innerText)
      setCaretLast(this.id)
      compareSpans()
    }
  });

  // Wraps user words in span
  function wrapWords (text) {
    let splitText = text.split(' ')
    let output = []
    let count = splitText.length
    for (let i = 0; i < count; i++) {
      output[i] = "<span id=\"word-"+i+"\">"+splitText[i]+"</span>"
    }
    return output.join(' ')
  }

  // puts cursor at the end of the sentence
  function setCaretLast (el) {
    var el = document.getElementById(el);
    let range = document.createRange();
    let sel = window.getSelection();
    range.setStart(el.childNodes[el.childNodes.length - 1], 1);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    el.focus();
  }

  // Compares User span to prompt span.
  function compareSpans () {
    let correctCounter = 0
    let incorrectCounter = 0
    let spanCount = promptDiv.querySelectorAll('span').length
    for (let i = 0; i < spanCount; i++) {
      let promptWord = document.querySelector(`#prompt-${i}`).innerText
      let userWord = document.querySelector(`#word-${i}`).innerText
      const nextWord = document.querySelector(`#prompt-${i}`)
      nextWord.style.color = 'gray'
      if (promptWord === userWord) {
        ++correctCounter
        correctP.innerText = correctCounter
      }
      else {
        nextWord.style.color = 'red'
        ++incorrectCounter
        incorrectP.innerText = incorrectCounter
      }
      const highlighted = document.querySelector(`#prompt-${i + 1}`)
      highlighted.style.color = 'blue'
    }
  }

  // Creates timer and posts score to database when timer is up.
  function timer () {
    userTextbox.removeEventListener('focus', timer)
    var sec = 5;
    var timer = setInterval(function () {
      document.getElementById('safeTimerDisplay').innerHTML = sec;
      sec--;
      if (sec < 0) {
        clearInterval(timer);
        let score = correctP.innerText - incorrectP.innerText
        alert(`Time's up! Words Per Minute: ${score}`)
        userTextbox.blur()
        postGameScoreToDatabase()
        userTextbox.remove();
      }
    }, 1000);
  }

  // Function that adds score to database
  function postGameScoreToDatabase () {
    let score = correctP.innerText - incorrectP.innerText
    // let userId = parseInt(document.querySelector('.the-user-we-need').id)
    // console.log(score)
    // console.log(userId)
    fetch('http://localhost:3000/gamescores', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "user_id": currentUser,
        "score" : score
      })
    })
  }

  // Reloads the page when user clicks play again
  function reloadPage(){
    location.reload();
  }

}); //end brackets

//次の動画へ
const goNextVideo = () => {
  // コメントを開いてなければ
  if (document.querySelectorAll("tp-yt-paper-dialog.style-scope.ytd-popup-container[aria-hidden='true']").length !== 0 || document.querySelector("ytd-popup-container.style-scope.ytd-app").childElementCount === 0) {
    shortsContainer.scrollBy(0, 2000)
    attachEvent()
  }
}

//イベント付加
const attachEvent = () => {
  //処理を連続して起こさない
  clearTimeout(timeoutVideo)
  timeoutVideo = setTimeout(() => {
    //main動画の再取得
    mainVideo = document.querySelector("video.video-stream.html5-main-video[src]")
    mainVideo.removeAttribute("loop")
    //動画終了イベント
    mainVideo.removeEventListener('ended', goNextVideo)
    mainVideo.addEventListener('ended', goNextVideo)
	}, 1000 )
}

//ダブルクリック時に10秒スキップ
const skip10Sec = (event) => {
  event.stopPropagation()
  const clientRect = event.currentTarget.getBoundingClientRect()
  const halfPosit = (clientRect.right - clientRect.left) / 2 + clientRect.left
  if (halfPosit > event.pageX) {  // 左
    if (0 > mainVideo.currentTime - 10) { //最小再生時間を超えているか
      mainVideo.currentTime = 0
    } else { 
      mainVideo.currentTime -= 10
    }
  } else {  //右
    if (mainVideo.duration < mainVideo.currentTime + 10) { //最大再生時間を超えているか
      mainVideo.currentTime = mainVideo.duration
    } else {
      mainVideo.currentTime += 10
    }
  }
}

let timeoutVideo
let mainVideo
let shortsContainer = null

window.onload = () => {
  if (shortsContainer !== null) return
  const timer = setInterval(() => {
    shortsContainer = document.querySelector("#shorts-container")
    if (shortsContainer === null) return
    clearInterval(timer)
    //なめらかなスクロール
    shortsContainer.style.scrollBehavior = 'smooth'
    //デフォルトのスクロール時のイベント
    shortsContainer.onscroll = () => {
      attachEvent()
    }
    //ダブルクリックイベント
    shortsContainer.ondblclick = (e) => {
      skip10Sec(e)
    }
    //初回セットアップ
    attachEvent()
    
  }, 200)
}

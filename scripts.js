const g = document.getElementById.bind(document)

const api = 'https://us-central1-samantha-374622.cloudfunctions.net/tiktok'
// const api = 'http://localhost:8080/'

const search = async query => {
  g('status').textContent = `Searching TikTok videos for ${query}…`
  const response = await fetch(api, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      endpoint: 'search',
      options: {
        category: 'videos',
        query: query,
      },
    }),
  })
  return response.json()
}

const video = async item => {
  g('status').textContent = `Attempting to play TikTok video with ID ${item.id}…`
  const response = await fetch(api, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      endpoint: 'video',
      options: {
        downloadAddr: item.video.downloadAddr,
        id: item.id,
      },
    }),
  })
  const json = await response.json()
  console.log(json)
  const video = document.createElement('video')
  video.autoplay = true
  video.src = json.url
  g('status').appendChild(video)
}

const go = () => {
  g('videos').textContent = ''
  search(g('input').value).then(data => {
    data.item_list.forEach(item => {
      console.log(item)
      const post = document.createElement('div')
      post.className = 'post'
      const cover = document.createElement('img')
      cover.src = item.video.cover
      post.appendChild(cover)
      const user = document.createElement('h2')
      user.textContent = `@${item.author.uniqueId}`
      post.appendChild(user)
      const desc = document.createElement('p')
      desc.textContent = `@${item.desc}`
      post.appendChild(desc)
      post.onclick = () => download(item)
      g('videos').appendChild(post)
    })
  })
}

const download = item => video(item)

const g = document.getElementById.bind(document)

const api = 'https://us-central1-samantha-374622.cloudfunctions.net/tiktok'

const tik = async query => {
  console.log(`Looking up videos on TikTok for ${query}`)
  const response = await fetch(api, {
    method: 'POST',
    body: query,
  })
  return response.json()
}

const go = () => {
  g('videos').textContent = ''
  tik(g('input').value).then(data => {
    data.item_list.forEach(item => {
      const post = document.createElement('div')
      post.className = 'post'
      const video = document.createElement('video')
      video.src = item.video.playAddr
      post.appendChild(video)
      const cover = document.createElement('img')
      cover.src = item.video.cover
      post.appendChild(cover)
      const user = document.createElement('h2')
      user.textContent = `@${item.author.uniqueId}`
      post.appendChild(user)
      const desc = document.createElement('p')
      desc.textContent = `@${item.desc}`
      post.appendChild(desc)
      g('videos').appendChild(post)
    })
  })
}

const express = require('express')

const app = express()
const port = 5000

//static files
app.use(express.static('css'))
app.use('/css', express.static(__dirname + '/css'))

//templating engine
app.set('views', './views')
app.set('view engine', 'ejs')   

//route
const newsRouter = require('./routes/news')
//frontpage using router
app.use('/', newsRouter)

//listening on port 4000
app.listen(port, () => console.log(`Listening on port ${port}`))



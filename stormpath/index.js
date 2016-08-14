let express = require('express');
// let stormpath = require('stormpath');
let stormpath = require('express-stormpath');

let app = express()

app.use(stormpath.init(app, {
  apiKey: {
   id: '4C9M943KP4RL9FGVS66P0M2AY',
   secret: '63qeaPd6HCtZqy+J19TCSfmvj/SYZSYkDXw+E6Sr3xg'
 },
 application: {
   href: `https://api.stormpath.com/v1/applications/4u49oeg3izyJGRkcH0usTf`
 }
}))

app.get('/notes', stormpath.apiAuthenticationRequired, (req, res) => {
  res.json({notes: req.user.customData.notes || "This is your notebook. Edit this to start saving your notes!"})
})

app.listen(3000);

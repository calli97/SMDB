const app= require('./app.js')
const server=app.listen(app.get('port'),()=>{
    console.log(`Iniciando express en puerto ${app.get('port')}`)
})

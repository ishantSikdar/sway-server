const express = require('express');
const PORT = process.env.PORT || 3000;

const app = express()
app.use(express.json())
app.use('/user', userRoute);

app.use((error, data, req, res) => {
    console.error(`Error occured: ${err}`)
    res.status(500).json({
        message: `Some error occured: ${err.message}`
    })
})

app.listen(PORT, () => {
    console.log(`App listening to PORT ${PORT}`)
})
let count = 0;


const viewCount = (req, res, next) => {
    count++;
    console.log(count);
    // res.send(`view counted ${count} times`)
    // next() // here calling next meanst it will go to the  "app.use('/tools', toolsRoute)" line and it will executed 
}


module.exports = viewCount; 
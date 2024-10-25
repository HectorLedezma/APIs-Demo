const GetRequest = async (req,res) =>{
    try {
        await res.send({
            Method:req.method,
            Header:req.headers,
            Body:req.body,
            Query:req.query
        })
    } catch (error) {
        console.log("Error: "+error);
    }
}

const PostRequest = async (req,res) =>{
    try {
        await res.send({
            Method:req.method,
            Header:req.headers,
            Body:req.body,
            Query:req.query
        })
    } catch (error) {
        console.log("Error: "+error);
    }
}

const PutRequest = async (req,res) =>{
    try {
        await res.send({
            Method:req.method,
            Header:req.headers,
            Body:req.body,
            Query:req.query
        })
    } catch (error) {
        console.log("Error: "+error);
    }
}

module.exports = {
    GetRequest,
    PostRequest,
    PutRequest
}
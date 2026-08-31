const crypto = require('crypto');

const SendImage = async (req,res) =>{

    const header = req.headers;
    const body1 = req.body;
    const query = req.query;

    //console.log(header)

    function getFileType(fileName) {
        const extension = fileName.split('.').pop().toLowerCase();
        const ImageExtensions = ['jpg', 'jpeg', 'png', 'gif','webp'];
        const DocumentExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];
        const AudioExtentions = ['aac','mp3','mpeg','amr','ogg','opus'];
        const VideoExtentions = ['mp4','3gpp'];
        const DocumentSubType = {
            "pdf":"pdf",
            "ppt":"vnd.ms-powerpoint",
            "pptx":"vnd.openxmlformats-officedocument.presentationml.presentation",
            "doc":"msword",
            "docx":"vnd.openxmlformats-officedocument.wordprocessingml.document",
            "xls":"vnd.ms-excel",
            "xlsx":"vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }

        if (ImageExtensions.includes(extension)) {
            if (extension=='jpg' || extension=='jpeg') {
                return 'image/jpeg'
            }else{
                return 'image/'+extension
            }
        } else if (VideoExtentions.includes(extension)) {
            return 'video/'+extension;
        } else if (AudioExtentions.includes(extension)) {
            return 'audio/'+extension;
        } else if (DocumentExtensions.includes(extension)) {
            return 'application/'+DocumentSubType[extension];
        } else {
            return 'text/plain';
        }
    }

    function getFileMetaType(fileName) {
        const ImageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        const DocumentExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx','txt'];
        const extension = fileName.split('.').pop().toLowerCase();
        if (ImageExtensions.includes(extension)) {
            return 'image';
        } else if (DocumentExtensions.includes(extension)) {
            return 'document';
        }else{
            return 'text'
        }
    }

    async function SendFileMessageToWhatsApp(FileID,FileName) {
        
        const url = 'https://graph.facebook.com/'+query.version+'/'+query.phone_id+'/messages';
        
        const token = header.authorization;

        //console.log('ENVIANDO...');
        
        const metaType = getFileMetaType(FileName);

        const FileToSend = {
            "image":{
                "id": ""+FileID,
                "caption": ""+body1.message
            },
            "document":{
                "id": ""+FileID,
                "filename": FileName,
                "caption": ""+body1.message
            },
            "text":{
                "preview_url": true,
                "body": ""+body1.message
            }
        }

        //console.log(FileToSend[metaType])

        const body ={
            [metaType]: FileToSend[metaType],
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": "+"+query.to,
            "type": metaType
            /*,
            "context":body1['context']*/
        }
        
        //console.log(body)

        const options = {
            'method': 'POST',
            'headers': {
                'Authorization': token,
                'content-type': 'application/json'
            },
            'body': JSON.stringify(body),
        };

        //

        //console.log('\n//////////////////////////////////////////////////////////////////////////////////////////////////////// Option:\n', options);
        let data = {};
        try {
            const response = await fetch(url, options);
            data = await response.json();
            //console.log('\n//////////////////////////////////////////////////////////////////////////////////////////////////////// Data:\n',data);
            await res.send(data.messages[0].id);
        } catch (Error) {
            //console.log('\n////////////////////////////////////////////////////////////////////////////////////////////////////////Data (Error):\n',data);
            console.error(Error);
            await res.send(Error);
        }

    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const url = 'https://graph.facebook.com/'+query.version+'/'+query.phone_id+'/media';

    const token = header.authorization;

    const FileData = body1.file_data;

    //console.log(FileData)

    const fileName = body1.file_name;

    const fileType = getFileType(fileName);
 
    const options = {
        'method': 'POST',
        'headers': {
            'Authorization': token
        },
        'body': new FormData()
    };

    const imgHex = FileData.replace(/^0x/i, '').trim();
    const buffer = Buffer.from(imgHex, 'hex');

    const file = new File([buffer], fileName, { type: fileType });

    options.body.append('file',file);
    options.body.append('messaging_product', 'whatsapp');
 
    //console.log('\n////////////////////////////////////////////////////////////////////////////////////////////////////\n',options)
    console.log(options.body)
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        //console.log(data)
        SendFileMessageToWhatsApp(data.id,fileName);
        //await res.send(data);
    } catch (error) {
        console.log("Error: "+error);
        res.send(error)
    }
}

const GetEnviroment = async (req,res) =>{
    const secretKey = process.env.QbizAPIToken;
    const receivedHash = req.headers['x-secret-key'];

    //console.log(secretKey,receivedHash);

    if (!secretKey || typeof receivedHash !== 'string') {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const expectedHash = crypto
        .createHash('sha256')
        .update(secretKey, 'utf8')
        .digest('hex');

    const expected = Buffer.from(expectedHash, 'hex');
    const received = Buffer.from(receivedHash.trim().toLowerCase(), 'hex');

    console.log(expectedHash,receivedHash);

    if (
        received.length !== expected.length ||
        !crypto.timingSafeEqual(received, expected)
    ) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    // acciones con credencial correcta

    
    return res.status(200).json({ received: true, message: req.body });
}

const ReciveMessage = async (req,res) =>{
    const secretKey = process.env.QbizAPIToken;
    const receivedHash = req.headers['x-secret-key'];

    if (!secretKey || typeof receivedHash !== 'string') {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const expectedHash = crypto
        .createHash('sha256')
        .update(secretKey, 'utf8')
        .digest('hex');

    const expected = Buffer.from(expectedHash, 'hex');
    const received = Buffer.from(receivedHash.trim().toLowerCase(), 'hex');

    if (
        received.length !== expected.length ||
        !crypto.timingSafeEqual(received, expected)
    ) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    // acciones con credencial correcta

    return res.status(200).json({ received: true, message: req.body });
}



module.exports = {
    SendImage,
    ReciveMessage,
    GetEnviroment
}
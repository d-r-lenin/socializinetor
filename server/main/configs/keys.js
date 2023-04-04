const Master = require('../models/master');


module.exports = {
    getMaster: async function (key){
        let masterKey = {};
        try{
            masterKey = await Master.findOne({ key });
        } catch(e){
            console.error(e);
        } finally{
            return masterKey.value || null;
        }
    }
}
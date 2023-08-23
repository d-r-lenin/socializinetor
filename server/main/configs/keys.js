const Master = require('../models/master');


module.exports = {
    getMaster: async function (key){
        var masterKey = {};
        try{
            masterKey = await Master.findOne({ key });
            if (!masterKey) throw new Error("Master key not found");
        } catch(e){
            console.error(e);
            masterKey = { value: null}
        } finally{
            return masterKey.value || null;
        }
    }
}
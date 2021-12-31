var NameModel = require('../models/name.model');
module.exports = function(app){
    app.get('/',(req,res)=>{
        res.render('layout');
    });

    app.get('/token/:tokenId',function(req,res){
        if (!req.params.tokenId){
            res.json({err:1,data:{}});
            return;
        }
        ArtifactModel.findOne({tokenId:req.params.tokenId}).then(function(value){
            if(!value){
                res.json({err:2,data:{}});
                return;
            }
            res.json(value);
        });
    });
}
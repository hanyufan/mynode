var express = require('express');
var router = express.Router();
var UserModel = require("../model/User")
var goodsModel = require("../model/goods")
var multiparty = require("multiparty")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('shops', { title: 'shops' });
});


/* GET admin page. */
router.get('/admin', function(req, res, next) {
	if( req.session == null || req.session.username == null){
  	res.redirect("/login"); // 重定向
  	return
  }
  res.render('admin', { title: '后台' });
});
/* GET admin_2 page. */
router.get('/admin_2', function(req, res, next) {
  res.render('admin_2', { });
});

/* GET admin_3 page. */
router.get('/admin_3', function(req, res, next) {
  res.render('admin_3', { });
});

/* GET ListPage page. */
router.get('/ListPage', function(req, res, next) {
//	goodsModel.find({}, 
//		function (err, docs) {
//			res.json(docs)
//	});
		var PageIndex = parseInt(req.query.PageIndex)
		console.log(PageIndex)
		var query = goodsModel.find({});
		console.log(query)
		query.count({},function(err, count){
//			console.log(count)
			query.skip(PageIndex).limit(5).exec('find', function(err, items) {
				console.log(count)
				var result = {
					pageindex: count,
					items: items,
				}
			res.json(result);
//			console.log(items)
			});
			
		});
		
});

/* GET shanchu page. */
router.get('/shanchu', function(req, res, next) {
	var cnm = req.query.goods_name
	var result = {
		code:2,
		message:"删除成功"
	}
 goodsModel.remove({goods_name:cnm},function(err){
 	if(!err){
 		result.code = 1
 	}
 	res.json(result)
});

});

/* GET admin_3 page. */
router.post('/api/addgoodsAction', function(req, res, next) {
 		var form = new multiparty.Form({
    	uploadDir: "public/images"
    })
 			var result = {
			code: 1,
			message: "商品信息保存成功"
		};
    form.parse(req, function(err, fields, files) {
    	var goods_name = fields.goods_name[0]
//  	console.log(goods_name)
    	var goods_id = fields.goods_id[0]
    	var brand = fields.brand[0]
    	var price = fields.price[0]
    	var price_vip = fields.price_vip[0]
    	var price_youhui = fields.price_youhui[0]
    	var price_shichang = fields.price_shichang[0]
    	var price_xiao = fields.price_xiao[0]
    	var goods_img = (files.goods_img[0].path).replace("public\\","")
//  	console.log(goodname)
    	var mc = new goodsModel();
    	mc.goods_name = goods_name;
//  	console.log(mc.goods_name)
    	mc.goods_id = goods_id;
    	mc.brand = brand;
    	mc.price = price;
    	mc.price_vip= price_vip;
    	mc.price_youhui= price_youhui;
    	mc.price_shichang= price_shichang;
    	mc.price_xiao= price_xiao;
    	mc.goods_img = goods_img;
    	
    	mc.save(function(err){
    		if(err){
    			result.code = -1000;
    			result.message = "商品信息保存失败"
    		}
    		res.json(result)
    	})
   	});
});



/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: '登陆' });
});

router.post('/loginActive', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
//console.log(username)
  var result = {
  	code : 1 ,
  	message:"登陆成功"
  }
  UserModel.find({username: username,password:password}, function (err, docs) {
		if(docs.length == 0){
			result.code = -1;
			result.message="失败"
		}else{
			// 登录成功的时候，生成session
			req.session.username = username;
			console.log(req.session);
		}
		res.json(result)
	});
});



module.exports = router;

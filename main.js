Game.registerMod("tools helper mod",{
	init:function(){
		Game.Notify(`开启功能菜单!`, '', [16,5]);

		this.xxy_data = {
			'autoClick': false,
			'autoClickTimer': null,
			'autoClickGoldenCookies': false,
			'autoClickGoldenCookiesTimer': null,
			'autoClickWrinklers': false,
			'autoClickWrinklersTimer': null,
			'autoClickWrinklersFaster': false,
			'autoClickWrinklersFasterTimer': null,
			'autoClickNewReindeer': false,
			'autoClickNewReindeerTimer': null,
			'autoClickReindeer': false,
			'autoClickReindeerTimer': null,
		}

		var style = `<style type='text/css'>
						.devClass{
							display: flex!important; 
							flex-wrap: wrap; 
							justify-content: center;
							gap: 10px;
						} 
						.amenu{
							text-decoration: none; 
							text-align: center; 
							padding: 5px;
						}
						#storeTitle{
							background: none;
						}
						.backgroundLine{
							height: 16px;
    						background: url(img/panelGradientLeft.png) no-repeat top left,url(img/panelGradientRight.png) no-repeat top right,url(img/panelHorizontal.png?v=2) repeat-x;
						}
						.flex-100{
							width: 100%;
							text-align: center;
						}
					</style>`;

		var menu = `<div id="debugMenu" class="inset title zoneTitle">功能菜单</div>
					<div class="storeSection upgradeBox" style="height: auto">
						<div id="devConsoleContent" class="devClass">
							<div class="">
								<input type="checkbox" name="autoClick" id="autoClick" />
								<label for="autoClick">自动点击大饼干</label>
							</div>
							<div class="">
								<input type="checkbox" name="autoClickGoldenCookies" id="autoClickGoldenCookies" />
								<label for="autoClickGoldenCookies">自动点击黄金饼干</label>
							</div>
<!--							<div class="">-->
<!--								<input type="checkbox" name="autoClickWrinklers" id="autoClickWrinklers" />-->
<!--								<label for="autoClickWrinklers">自动点击饼干虫</label>-->
<!--							</div>-->
							<div class="flex-100">
								<input type="checkbox" name="autoClickWrinklersFaster" id="autoClickWrinklersFaster" />
								<label for="autoClickWrinklersFaster">自动点击饼干虫(快速版)</label>
							</div>
							<div class="">
								<input type="checkbox" name="autoClickNewReindeer" id="autoClickNewReindeer" />
								<label for="autoClickNewReindeer">自动生成驯鹿</label>
							</div>
							<div class="">
								<input type="checkbox" name="autoClickReindeer" id="autoClickReindeer" />
								<label for="autoClickReindeer">自动点击驯鹿</label>
							</div>
							<div class="">
								<a class="amenu" onclick="Game.cookies*=10;Game.cookiesEarned*=10;">x10倍饼干数量</a>
							</div>
							<div class=""><a class="amenu" onclick="Game.cookies*=100;Game.cookiesEarned*=100;">x100倍饼干数量</a></div>
							<div class=""><a class="amenu" onclick="for (var i in Game.Objects){Game.Objects[i].buy(100);}">购买所有建筑100个</a></div>
							<div class=""><a class="amenu" onclick="for (var i in Game.Objects){Game.Objects[i].sell(100);}">出售所有建筑100个</a></div>
							<div class=""><a class="amenu" onclick="var newShimmer=new Game.shimmer('golden');newShimmer.force='click frenzy';">点击狂热</a></div>
							<div class=""><a class="amenu" onclick="var newShimmer=new Game.shimmer('golden');newShimmer.force='cookie storm';">饼干风暴</a></div>
							<div class=""><a class="amenu" onclick="var newShimmer=new Game.shimmer('golden');newShimmer.force='dragon harvest';">飞龙收获</a></div>
							<div class=""><a class="amenu" onclick="var newShimmer=new Game.shimmer('golden');newShimmer.force='dragonflight';">飞龙在天</a></div>
							<div class=""><a class="amenu" onclick="Game.gainLumps(10);">增加10个糖块</a></div>
							<div class=""><a class="amenu warning" onclick="Game.RuinTheFun(1);">新的开局（解锁所有）</a></div>
							<div class=""><a class="amenu warning" onclick="Game.SesameReset();">清空所有（慎用）</a></div>
						</div>
						<div class="backgroundLine"></div>
					</div>`;

		l('store').insertAdjacentHTML('afterbegin', menu);
		l('store').insertAdjacentHTML('afterbegin', style);

		let MOD = this;

		AddEvent(l('autoClick'), 'click', function(){
			MOD.xxy_data.autoClick = !MOD.xxy_data.autoClick;
			if(MOD.xxy_data.autoClick){
				Game.Notify(`开启自动点击大饼干`,'',[16,5]);
				MOD.xxy_data.autoClickTimer = setInterval(Game.ClickCookie, 1);
			}else{
				Game.Notify(`关闭自动点击大饼干`,'',[16,5]);
				clearInterval(MOD.xxy_data.autoClickTimer)
			}
		})

		AddEvent(l('autoClickGoldenCookies'), 'click', function(){
			MOD.xxy_data.autoClickGoldenCookies = !MOD.xxy_data.autoClickGoldenCookies;
			if(MOD.xxy_data.autoClickGoldenCookies){
				Game.Notify(`开启自动点击黄金饼干`, '', [16,5]);
				MOD.xxy_data.autoClickGoldenCookiesTimer = setInterval(function() {
					Game.shimmers.forEach(function(shimmer) {
						if (shimmer.type == "golden") {
							shimmer.pop()
						}
					})
				}, 500);
			}else{
				Game.Notify(`关闭自动点击黄金饼干`, '', [16,5]);
				clearInterval(MOD.xxy_data.autoClickGoldenCookiesTimer)
			}
		})

		// AddEvent(l('autoClickWrinklers'), 'click', function(){
		// 	MOD.xxy_data.autoClickWrinklers = !MOD.xxy_data.autoClickWrinklers;
		// 	if(MOD.xxy_data.autoClickWrinklers){
		// 		Game.Notify(`开启自动点击饼干虫`, '', [16,5]);
		// 		clearInterval(MOD.xxy_data.autoClickWrinklersFasterTimer);
		// 		l('autoClickWrinklersFaster').removeAttribute('checked');
		//
		// 		l('autoClickWrinklers').checked = true;
		// 		MOD.xxy_data.autoClickWrinklersTimer = setInterval(function() {
		// 			for (var i=0;i<12;i++)
		// 			{
		// 				if (Game.wrinklers[i].close==1)
		// 				{Game.wrinklers[i].hp--}
		// 			}
		// 		}, 50);
		// 	}else{
		// 		l('autoClickWrinklers').checked = false;
		// 		Game.Notify(`关闭自动点击饼干虫`, '', [16,5]);
		// 		clearInterval(MOD.xxy_data.autoClickWrinklersTimer)
		// 	}
		// })

		AddEvent(l('autoClickWrinklersFaster'), 'click', function(){
			MOD.xxy_data.autoClickWrinklersFaster = !MOD.xxy_data.autoClickWrinklersFaster;
			if(MOD.xxy_data.autoClickWrinklersFaster){
				Game.Notify(`开启自动点击饼干虫(快速版)`, '', [16,5]);
				// clearInterval(MOD.xxy_data.autoClickWrinklersTimer);
				// l('autoClickWrinklers').removeAttribute('checked');

				// l('autoClickWrinklersFaster').checked = true;
				MOD.xxy_data.autoClickWrinklersFasterTimer = setInterval(Game.CollectWrinklers, 50);
			}else{
				// l('autoClickWrinklersFaster').checked = false;
				Game.Notify(`关闭自动点击饼干虫(快速版)`, '', [16,5]);
				clearInterval(MOD.xxy_data.autoClickWrinklersFasterTimer)
			}
		})

		AddEvent(l('autoClickNewReindeer'), 'click', function(){
			MOD.xxy_data.autoClickNewReindeer = !MOD.xxy_data.autoClickNewReindeer;
			if(MOD.xxy_data.autoClickNewReindeer){
				Game.Notify(`开启自动生成驯鹿`, '', [16,5]);
				MOD.xxy_data.autoClickNewReindeerTimer = setInterval(function(){
					new Game.shimmer('reindeer')
				}, 500);
			}else{
				Game.Notify(`关闭自动生成驯鹿`, '', [16,5]);
				clearInterval(MOD.xxy_data.autoClickNewReindeerTimer)
			}
		})

		AddEvent(l('autoClickReindeer'), 'click', function(){
			MOD.xxy_data.autoClickReindeer = !MOD.xxy_data.autoClickReindeer;
			if(MOD.xxy_data.autoClickReindeer){
				Game.Notify(`开启自动点击驯鹿`, '', [16,5]);
				MOD.xxy_data.autoClickReindeerTimer = setInterval( function() {
					Game.shimmers.forEach(function(shimmer) {
						if (shimmer.type == 'reindeer') {
							shimmer.pop()
						}
					})
				}, 500);
			}else{
				Game.Notify(`关闭自动点击驯鹿`, '', [16,5]);
				clearInterval(MOD.xxy_data.autoClickReindeerTimer)
			}
		})
	},
	save:function(){
		return JSON.stringify(this.xxy_data)
	},
	load:function(str){
		var data = JSON.parse(str);
	},
});

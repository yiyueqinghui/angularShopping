
  var app = angular.module('Yike',['ui.router']);
  app.config(function ($compileProvider) {
    $compileProvider.imgSrcSanitizationWhitelist('.jpg|.png');
  });
  
  app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
     
//   默认路由
     $urlRouterProvider.otherwise('/today');
//   定义路由
     $stateProvider
      .state('today',{
        url:'/today',
        templateUrl:'view/today.html',
      })
      .state('oldCon',{
        url:'/oldCon',
        templateUrl:'view/oldCon.html',
      })
      .state('author',{
        url:'/author',
        templateUrl:'view/author.html',
      })
      .state('colum',{
        url:'/colum',
        templateUrl:'view/colum.html',
      })
      .state('love',{
        url:'/love',
        templateUrl:'view/love.html',
      })
      .state('setting',{
        url:'/setting',
        templateUrl:'view/setting.html',
      })
  }])
  
  app.controller("ctr",["$scope","$rootScope","$http",function($scope,$rootScope,$http){
     $rootScope.bol = true;
     $rootScope.title = localStorage.getItem('title')|| "今日一刻";
     $rootScope.nav = function(event){
       var con = document.getElementById('container'),
           title = document.getElementsByClassName('title')[0],
           slide = document.getElementById('slideNav');
        if($rootScope.bol){
           con.style.transform = "translateX(9.5rem)";
           con.style.transition = "all .5s linear";
           
           title.style.transform = "translateX(9.5rem)";
           title.style.transition = "all .5s linear";
           
           slide.style.transform = "translateX(9.5rem)";
           slide.style.transition = "all .5s linear";
           $rootScope.bol = !$rootScope.bol;
        }else{
	        if(event.target.tagName == "SPAN"){
	        	 event.target.style.color = "blue";
	        	 $rootScope.title = event.target.innerHTML;
	        	 localStorage.setItem('title',$rootScope.title);
//	        	 点击对象的样式
	        	 var lis = $(event.target).parents('li').siblings();
	        	 for(var i=0;i<lis.length;i++){
	        	 	 $(lis[i]).find("span").css("color","#000000");
	        	 }
	         }
	        
           con.style.transform = "translateX(0rem)";
           con.style.transition = "all .5s linear";
           
           title.style.transform = "translateX(0rem)";
           title.style.transition = "all .5s linear";
           
           slide.style.transform = "translateX(0rem)";
           slide.style.transition = "all .5s linear";
           $rootScope.bol = !$rootScope.bol;
        
        }
     }
//   加载动画是否显示
     $scope.loaded = true;
     //今日一刻的数据
     $http({
     	  method:"get",
     	  cache:true,
     	  url:"./php/today.php",
     }).then(function(response){
     	  $rootScope.posts = response.data.posts;
     	  console.log($rootScope.posts);
     	  $rootScope.date =  response.data.date;
     	  $scope.loaded = !$scope.loaded;
     });
//   往期内容
     $http({
     	  method:"get",
     	  url:"./php/oldCon.php"
     }).then(function(res){
     	  $rootScope.old = res.data.posts;
     	  $rootScope.oldDate = res.data.date;
     	  $rootScope.loaded = !$scope.loaded;
     });
//   热门作者
     $http({
     	  method:"get",
     	  url:"./php/author.php"
     }).then(function(res){
     	  $rootScope.authors = res.data.authors;
     	  $rootScope.loaded = !$scope.loaded;
     });
 //  栏目浏览
     $http({
     	  method:"get",
     	  url:"./php/colum.php"
     }).then(function(res){
     	  $rootScope.colums= res.data.columns;
     	  $rootScope.loaded = !$scope.loaded;
     });
  }])
  
 
